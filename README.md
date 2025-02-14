# NewsletterChat - Dein persönlicher WhatsApp-Nachrichtenassistent

Erhalte maßgeschneiderte News direkt in deinen WhatsApp-Chat. Keine App-Installation nötig, keine komplizierte Einrichtung - einfach loslegen und informiert bleiben!

## 🎯 Deine Vorteile

- **Personalisierte News-Auswahl**: Du bestimmst die Themen, die dich wirklich interessieren
- **Direkt in WhatsApp**: Nachrichten kommen genau dort an, wo du sie lesen willst
- **Zeitersparnis**: KI-gestützte Zusammenfassungen der wichtigsten Artikel
- **Flexibel & Anpassbar**: Wähle selbst, wann und wie oft du News erhältst
- **Interaktiv**: Reagiere, speichere oder teile Artikel direkt im Chat

## 🚀 Features

### Für dich optimiert
- Intelligente Themenauswahl nach deinen Interessen
- Lesezeit-Schätzung für bessere Planung
- "Später lesen"-Funktion für wichtige Artikel
- Personalisierte Empfehlungen basierend auf deinem Leseverhalten

### Smarte Funktionen
- KI-gestützte Artikelzusammenfassungen
- Schnelle Reaktionen per Emoji
- Einfaches Teilen interessanter Artikel
- Wöchentliche Themen-Zusammenfassungen
- Breaking News Alerts (optional)

### Deine Kontrolle
- Flexible Zustellzeiten
- Themenpräferenzen jederzeit anpassbar
- Einfache Verwaltung per Chat-Befehle
- Feedback-System für bessere Empfehlungen

## 🛠 Technologie

- Vite + React + TypeScript für eine moderne Web-App
- shadcn-ui & Tailwind CSS für ein schönes Design
- Supabase für Backend & Authentifizierung
- OpenAI GPT-4 für intelligente Zusammenfassungen
- Twilio WhatsApp API für zuverlässige Zustellung
- Ragy.ai News API für aktuelle Nachrichten

## 🎬 Schnellstart

1. Klone das Repository
```sh
git clone https://github.com/toksz/nc
cd nc
```

2. Installiere die Abhängigkeiten
```sh
npm install
```

3. Richte die APIs ein
- Erstelle Accounts für:
	- [Supabase](https://supabase.com)
	- [OpenAI](https://platform.openai.com)
	- [Twilio](https://www.twilio.com)
	- [Ragy.ai](https://ragy.ai)

4. Erstelle die `.env` Datei
```env
# Supabase
VITE_SUPABASE_URL=deine-project-url
VITE_SUPABASE_ANON_KEY=dein-anon-key

# News Service
VITE_RAGY_API_KEY=dein-ragy-api-key
VITE_RAGY_LANG=de
VITE_RAGY_COUNTRY=DE
VITE_RAGY_MAX_SNIPPETS=10000

# OpenAI
VITE_OPENAI_API_KEY=dein-openai-api-key
VITE_OPENAI_MODEL=gpt-4

# Twilio
VITE_TWILIO_ACCOUNT_SID=dein-account-sid
VITE_TWILIO_AUTH_TOKEN=dein-auth-token
VITE_TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

5. Initialisiere die Datenbank
```sql
-- Nutzereinstellungen
CREATE TABLE user_preferences (
		id UUID REFERENCES auth.users ON DELETE CASCADE,
		topics TEXT[],
		reading_time INTEGER,
		delivery_preferences JSONB DEFAULT '{"frequency": "daily", "deliveryTime": "09:00", "topics": [], "whatsappNumber": null}'::jsonb,
		language_preferences TEXT[],
		content_type_preferences TEXT[],
		saved_articles UUID[],
		interaction_history JSONB,
		created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
		updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
		PRIMARY KEY (id)
);

-- Artikel
CREATE TABLE articles (
		id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
		title TEXT NOT NULL,
		content TEXT NOT NULL,
		summary TEXT,
		topics TEXT[],
		source TEXT,
		estimated_reading_time INTEGER,
		importance_score FLOAT,
		category TEXT,
		published_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
		created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Lesechronik
CREATE TABLE reading_history (
		id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
		user_id UUID REFERENCES auth.users ON DELETE CASCADE,
		article_id UUID REFERENCES articles ON DELETE CASCADE,
		reaction TEXT,
		read_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
```

6. Starte den Entwicklungsserver
```sh
npm run dev
```

## 📱 WhatsApp-Integration

1. Scanne den QR-Code auf der Website
2. Bestätige deine Telefonnummer
3. Wähle deine Interessensgebiete
4. Fertig! Du erhältst ab sofort deine personalisierten News

## 📦 Produktions-Build

```sh
npm run build
```

Die Build-Dateien findest du im `dist/` Verzeichnis.

## 📄 Lizenz

MIT

