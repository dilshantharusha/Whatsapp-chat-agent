import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhatsappController } from './whatsapp/whatsapp.controller';
import { ConfigModule } from '@nestjs/config';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { OpenaiService } from './open-ai/open-ai.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
  ],
  controllers: [AppController, WhatsappController],
  providers: [AppService, WhatsappService, OpenaiService],
})
export class AppModule {}
