import { Injectable } from '@nestjs/common';
import OpenAI from 'openai'; 

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: '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', // ✅ Good use of env variable
    });
  }

  async generateOpenAiResponse(prompt: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini', 
        messages: [{ role: 'user', content: prompt }],
      });

      
      return completion.choices[0]?.message?.content || 'No response';
    } catch (error) {
      console.error('OpenAI error:', error);
      return 'Sorry, I could not process your request.';
    }
  }
}
