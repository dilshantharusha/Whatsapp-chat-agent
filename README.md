
# 📱 WhatsApp Chatbot with OpenAI

This project connects **WhatsApp** with **OpenAI GPT (ChatGPT)** to create an AI-powered chatbot. When someone sends a message to your WhatsApp number, the bot replies with a smart AI-generated response.

---

## 🚀 Features

- Receive WhatsApp messages using Webhooks
- Send replies using OpenAI (ChatGPT)
- Easily configurable using environment variables
- Built with **NestJS** for clean code and scalability

---

## 📁 Folder Overview

```
whatsapp_bot/
├── src/
│   ├── openai/         # Connects to OpenAI
│   ├── whatsapp/       # Handles WhatsApp messages & webhooks
│   ├── config/         # App configuration
│   └── main.ts         # App entry point
├── .env                # Your secret keys (not shared)
├── package.json        # Project dependencies
```

---

## 🔧 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/Whatsapp-chat-agent.git
cd Whatsapp-chat-agent
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a `.env` file in the root folder with this content:

```env
VERIFY_TOKEN=your_webhook_verify_token
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
OPENAI_API_KEY=your_openai_api_key
```

> 🔒 Keep this file private — it contains sensitive data.

### 4. Run the app

```bash
npm run start:dev
```

### 5. Expose your app to the internet

Use [ngrok](https://ngrok.com/) to connect WhatsApp with your local server:

```bash
npx ngrok http 3000
```

Copy the ngrok URL and use it to register your webhook with WhatsApp.

---

## 🔁 Webhook Endpoints

| Method | Endpoint              | Purpose               |
|--------|-----------------------|------------------------|
| GET    | `/whatsapp/webhook`   | Webhook verification   |
| POST   | `/whatsapp/webhook`   | Receive messages       |

---

## 🤖 How It Works

1. User sends a message to your WhatsApp number
2. Your app receives it via a webhook
3. The app sends the message to OpenAI
4. OpenAI generates a reply
5. The reply is sent back to the user on WhatsApp

---

## 🧪 Testing

Run this to test the project:

```bash
npm run test
```

---

## 📦 Key Dependencies

- `@nestjs/core` — NestJS framework
- `axios` — API requests
- `openai` — ChatGPT integration

---

## 📄 License

This project is open-source under the **MIT License**.
