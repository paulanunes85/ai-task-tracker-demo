param location string = resourceGroup().location
param appName string = 'ai-task-tracker'
param environment string = 'production'

// Resource names
var webAppName = '${appName}-web-${uniqueString(resourceGroup().id)}'
var apiAppName = '${appName}-api-${uniqueString(resourceGroup().id)}'
var appServicePlanName = '${appName}-plan'
var postgresServerName = '${appName}-db-${uniqueString(resourceGroup().id)}'
var openAIName = '${appName}-openai'
var appInsightsName = '${appName}-insights'
var workspaceName = '${appName}-workspace'

// App Service Plan
resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: 'B1'
    tier: 'Basic'
  }
  kind: 'linux'
  properties: {
    reserved: true
  }
}

// Backend App Service
resource apiApp 'Microsoft.Web/sites@2022-03-01' = {
  name: apiAppName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|18-lts'
      appSettings: [
        {
          name: 'NODE_ENV'
          value: environment
        }
        {
          name: 'DATABASE_URL'
          value: 'postgresql://${postgresAdminUsername}:${postgresAdminPassword}@${postgresServer.properties.fullyQualifiedDomainName}:5432/${postgresDatabaseName}?sslmode=require'
        }
        {
          name: 'AZURE_OPENAI_ENDPOINT'
          value: openAI.properties.endpoint
        }
        {
          name: 'AZURE_OPENAI_KEY'
          value: openAI.listKeys().key1
        }
        {
          name: 'AZURE_OPENAI_DEPLOYMENT'
          value: 'gpt-35-turbo'
        }
        {
          name: 'APPLICATION_INSIGHTS_KEY'
          value: appInsights.properties.InstrumentationKey
        }
        {
          name: 'CORS_ORIGIN'
          value: 'https://${webApp.properties.defaultHostName}'
        }
      ]
    }
  }
}

// Frontend Static Web App
resource webApp 'Microsoft.Web/staticSites@2022-03-01' = {
  name: webAppName
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    repositoryUrl: 'https://github.com/paulanunes85/ai-task-tracker-demo'
    branch: 'main'
    buildProperties: {
      appLocation: '/frontend'
      apiLocation: ''
      outputLocation: 'build'
    }
  }
}

// PostgreSQL Database
var postgresAdminUsername = 'dbadmin'
var postgresAdminPassword = 'P@ssw0rd${uniqueString(resourceGroup().id)}!'
var postgresDatabaseName = 'tasktracker'

resource postgresServer 'Microsoft.DBforPostgreSQL/flexibleServers@2022-12-01' = {
  name: postgresServerName
  location: location
  sku: {
    name: 'Standard_B1ms'
    tier: 'Burstable'
  }
  properties: {
    administratorLogin: postgresAdminUsername
    administratorLoginPassword: postgresAdminPassword
    version: '15'
    storage: {
      storageSizeGB: 32
    }
    backup: {
      backupRetentionDays: 7
      geoRedundantBackup: 'Disabled'
    }
  }
}

resource postgresDatabase 'Microsoft.DBforPostgreSQL/flexibleServers/databases@2022-12-01' = {
  parent: postgresServer
  name: postgresDatabaseName
}

resource postgresFirewallRule 'Microsoft.DBforPostgreSQL/flexibleServers/firewallRules@2022-12-01' = {
  parent: postgresServer
  name: 'AllowAllAzureIPs'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

// Azure OpenAI
resource openAI 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: openAIName
  location: location
  kind: 'OpenAI'
  sku: {
    name: 'S0'
  }
  properties: {
    customSubDomainName: openAIName
    publicNetworkAccess: 'Enabled'
  }
}

resource openAIDeployment 'Microsoft.CognitiveServices/accounts/deployments@2023-05-01' = {
  parent: openAI
  name: 'gpt-35-turbo'
  properties: {
    model: {
      format: 'OpenAI'
      name: 'gpt-35-turbo'
      version: '0613'
    }
    scaleSettings: {
      scaleType: 'Standard'
    }
  }
}

// Application Insights
resource workspace 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: workspaceName
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: workspace.id
  }
}

// Outputs
output webAppUrl string = 'https://${webApp.properties.defaultHostName}'
output apiAppUrl string = 'https://${apiApp.properties.defaultHostName}'
output databaseServer string = postgresServer.properties.fullyQualifiedDomainName