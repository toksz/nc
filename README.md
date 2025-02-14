# NewsletterChat (NC)

A modern web application that delivers personalized news content via WhatsApp, based on user preferences and interests.

## Tech Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Backend & Authentication)
- OpenAI GPT-4
- Twilio WhatsApp API
- Ragy.ai News API

## Getting Started

1. Clone the repository
```sh
git clone https://github.com/toksz/nc
cd nc
```

2. Install dependencies
```sh
npm install
npm install @supabase/supabase-js twilio @types/twilio
```

3. API Setup
- Create accounts and get API keys for:
	- [Supabase](https://supabase.com)
	- [OpenAI](https://platform.openai.com)
	- [Twilio](https://www.twilio.com) (WhatsApp Business API)
	- [Ragy.ai](https://ragy.ai)

4. Environment Setup
Create a `.env` file in the project root:
```env
# Supabase
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key

# News Service
VITE_RAGY_API_KEY=your-ragy-api-key
VITE_RAGY_LANG=de
VITE_RAGY_COUNTRY=DE
VITE_RAGY_MAX_SNIPPETS=10000

# OpenAI
VITE_OPENAI_API_KEY=your-openai-api-key
VITE_OPENAI_MODEL=gpt-4

# Twilio
VITE_TWILIO_ACCOUNT_SID=your-account-sid
VITE_TWILIO_AUTH_TOKEN=your-auth-token
VITE_TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

5. Initialize Database
Run these SQL commands in Supabase SQL editor:
```sql
-- Users preferences table
CREATE TABLE user_preferences (
	id UUID REFERENCES auth.users ON DELETE CASCADE,
	topics TEXT[],
	reading_time INTEGER,
	delivery_preferences JSONB DEFAULT '{"frequency": "daily", "deliveryTime": "09:00", "topics": [], "whatsappNumber": null}'::jsonb,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
	PRIMARY KEY (id)
);

-- Articles table
CREATE TABLE articles (
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	title TEXT NOT NULL,
	content TEXT NOT NULL,
	topics TEXT[],
	source TEXT,
	published_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
	created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Reading history table
CREATE TABLE reading_history (
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	user_id UUID REFERENCES auth.users ON DELETE CASCADE,
	article_id UUID REFERENCES articles ON DELETE CASCADE,
	read_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
```

5. Start the development server
```sh
npm run dev
```

## Features

See [PROJECT.md](PROJECT.md) for a complete list of current and planned features.

## Development

The project uses:
- Vite for fast development and building
- React with TypeScript for robust frontend development
- shadcn-ui for beautiful, accessible UI components
- Tailwind CSS for utility-first styling
- Supabase for backend services:
	- Authentication
	- Database
	- Real-time updates
	- Storage
- OpenAI GPT-4 for news summarization
- Twilio for WhatsApp message delivery
- Ragy.ai for news aggregation

## Building for Production

To create a production build:

```sh
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## License

MIT

