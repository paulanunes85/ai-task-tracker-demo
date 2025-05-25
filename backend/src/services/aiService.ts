import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import dotenv from 'dotenv';

dotenv.config();

export interface AIAnalysisResult {
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  reasoning?: string;
}

export class AIService {
  private client: OpenAIClient | null = null;
  private deploymentName: string;

  constructor() {
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_KEY;
    this.deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-35-turbo';

    if (endpoint && apiKey) {
      this.client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
    } else {
      console.warn('⚠️  Azure OpenAI not configured - using mock AI service');
    }
  }

  async analyzeTask(title: string, description?: string): Promise<AIAnalysisResult> {
    if (!this.client) {
      return this.mockAnalyzeTask(title, description);
    }

    try {
      const prompt = `Analyze this task and provide categorization and priority.

Task Title: ${title}
Description: ${description || 'No description provided'}

Categories: Work, Personal, Urgent, Learning
Priorities: High, Medium, Low

Respond in JSON format:
{
  "category": "<category>",
  "priority": "<priority>",
  "reasoning": "<brief explanation>"
}`;

      const response = await this.client.getCompletions(this.deploymentName, [prompt], {
        maxTokens: 150,
        temperature: 0.3,
      });

      const result = response.choices[0]?.text?.trim();
      if (result) {
        try {
          return JSON.parse(result);
        } catch (e) {
          console.error('Failed to parse AI response:', e);
        }
      }
    } catch (error) {
      console.error('AI analysis failed:', error);
    }

    return this.mockAnalyzeTask(title, description);
  }

  private mockAnalyzeTask(title: string, description?: string): AIAnalysisResult {
    // Simple keyword-based categorization for demo purposes
    const text = `${title} ${description || ''}`.toLowerCase();
    
    let category = 'Personal';
    let priority: 'High' | 'Medium' | 'Low' = 'Medium';

    // Category detection
    if (text.includes('work') || text.includes('meeting') || text.includes('report') || 
        text.includes('project') || text.includes('deadline')) {
      category = 'Work';
    } else if (text.includes('urgent') || text.includes('asap') || text.includes('emergency')) {
      category = 'Urgent';
    } else if (text.includes('learn') || text.includes('study') || text.includes('course') || 
               text.includes('tutorial')) {
      category = 'Learning';
    }

    // Priority detection
    if (text.includes('urgent') || text.includes('asap') || text.includes('critical') || 
        text.includes('deadline') || text.includes('today')) {
      priority = 'High';
    } else if (text.includes('low') || text.includes('whenever') || text.includes('optional')) {
      priority = 'Low';
    }

    return {
      category,
      priority,
      reasoning: 'Analyzed based on keywords (AI service not configured)',
    };
  }
}