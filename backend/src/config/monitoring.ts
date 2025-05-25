import * as appInsights from 'applicationinsights';

export const setupApplicationInsights = () => {
  const instrumentationKey = process.env.APPLICATION_INSIGHTS_KEY;
  
  if (!instrumentationKey) {
    console.log('⚠️  Application Insights not configured');
    return;
  }

  appInsights.setup(instrumentationKey)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(false)
    .start();

  console.log('✅ Application Insights configured');
};