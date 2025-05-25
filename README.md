# AI Task Tracker Demo

> A modern task management application powered by AI for intelligent categorization and prioritization.

## 🚀 Quick Demo Guide (20 minutes)

This repository contains a complete AI-powered task tracking application designed for demonstrating GitHub Copilot Agent Mode capabilities in the Agentic DevOps workshop.

## 🎯 Features

- **AI-Powered Categorization**: Automatically categorizes tasks using Azure OpenAI
- **Smart Priority Assignment**: AI suggests priority levels based on task content
- **Modern UI**: Clean, responsive design with React and Tailwind CSS
- **Real-time Updates**: Live task management with instant AI analysis
- **Azure Integration**: Fully deployable to Azure with best practices
- **Dark Mode**: Professional dark theme support

## 📋 Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Azure Subscription (free tier works)
- GitHub Copilot access
- Azure CLI installed

## 🏃 Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/paulanunes85/ai-task-tracker-demo.git
cd ai-task-tracker-demo

# Copy environment variables
cp .env.example .env

# Start with Docker Compose
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

## 🌐 Azure Deployment

```bash
# Login to Azure
az login

# Create resource group
az group create --name rg-ai-task-tracker --location eastus

# Deploy infrastructure
cd infrastructure
az deployment group create \
  --resource-group rg-ai-task-tracker \
  --template-file main.bicep \
  --parameters @main.parameters.json

# Deploy application via GitHub Actions
git push origin main
```

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React SPA     │────▶│   Express API   │────▶│   PostgreSQL    │
│  (Frontend)     │     │   (Backend)     │     │   (Database)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │
         └───────────┬───────────┘
                     │
              ┌──────▼──────────┐
              │ Azure OpenAI  │
              │   Service     │
              └───────────────┘
```

## 📁 Project Structure

```
ai-task-tracker-demo/
├── frontend/               # React TypeScript application
├── backend/               # Express.js API server
├── infrastructure/        # Azure Bicep templates
├── .github/workflows/     # CI/CD pipelines
├── docs/                  # Documentation
├── docker-compose.yml     # Local development setup
└── README.md             # This file
```

## 🔧 Environment Variables

```env
# Backend
DATABASE_URL=postgresql://user:password@localhost:5432/tasktracker
AZURE_OPENAI_ENDPOINT=https://your-openai.openai.azure.com/
AZURE_OPENAI_KEY=your-api-key
AZURE_OPENAI_DEPLOYMENT=gpt-35-turbo

# Frontend
REACT_APP_API_URL=http://localhost:3001
```

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Development Guide](./docs/DEVELOPMENT.md)

## 🎮 Demo Script

1. **Show the Problem**: Traditional task management lacks intelligence
2. **Introduce Solution**: AI-powered categorization and prioritization
3. **Live Coding**: Use GitHub Copilot Agent Mode to enhance features
4. **Local Demo**: Show the application running locally
5. **Azure Deployment**: Deploy to cloud with single command
6. **Production Demo**: Show live Azure application

## 🤝 Contributing

This is a demo repository for workshop purposes. Feel free to fork and enhance!

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for the Agentic DevOps Workshop**