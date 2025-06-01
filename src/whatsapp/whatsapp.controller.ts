import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';
import { WhatsappService } from './whatsapp.service';
import { OpenaiService } from '../open-ai/open-ai.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private whatsappService: WhatsappService,
    private openaiService: OpenaiService,
  ) {}

  @Get()
  getWhatsapp(): string {
    return 'Hello Whatsapp!';
  }

  @Get('webhook')
  challengeWebhook(@Req() req: Request, @Res() res: Response) {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
      if (mode === 'subscribe' && token === '123456789') { // Replace with your own token
        console.log('WEBHOOK_VERIFIED ✅');
        return res.status(200).send(challenge);
      } else {
        return res.sendStatus(403);
      }
    }
    return res.sendStatus(400);
  }

  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const body = req.body;

    if (
      body.object === 'whatsapp_business_account' &&
      body.entry &&
      body.entry[0]?.changes[0]?.value?.messages
    ) {
      const messageData = body.entry[0].changes[0].value;

      const name = messageData.contacts[0]?.profile?.name || 'there';
      const number = messageData.contacts[0]?.wa_id;
      const message = messageData.messages[0]?.text?.body;

      console.log('📩 Received message!');
      console.log(`👤 Name: ${name}`);
      console.log(`📞 Number: ${number}`);
      console.log(`💬 Message: ${message}`);

      let replyText = 'Sorry, I could not process your request.';

      try {
        
        replyText = await this.openaiService.generateOpenAiResponse(message);
      } catch (err) {
        console.error('Error generating OpenAI response:', err);
      }

      try {
        const phone_number_id = messageData.metadata.phone_number_id;
        const token = process.env.WHATSAPP_ACCESS_TOKEN; //Create .env file and add your token using this format or create your own format
        

        await axios.post(
          `https://graph.facebook.com/v19.0/${phone_number_id}/messages`,
          {
            messaging_product: 'whatsapp',
            to: number,
            type: 'text',
            text: {
              body: replyText,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('✅ Reply sent!');
      } catch (error) {
        console.error('❌ Error sending reply:', error.response?.data || error.message);
      }
    }

    return res.sendStatus(200);
  }
}
