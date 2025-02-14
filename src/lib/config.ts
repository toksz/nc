export const config = {
	ragy: {
		apiKey: import.meta.env.VITE_RAGY_API_KEY,
		lang: import.meta.env.VITE_RAGY_LANG || 'de',
		country: import.meta.env.VITE_RAGY_COUNTRY || 'DE',
		maxSnippetsLength: Number(import.meta.env.VITE_RAGY_MAX_SNIPPETS) || 10000
	},
	openai: {
		apiKey: import.meta.env.VITE_OPENAI_API_KEY,
		model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4'
	},
	twilio: {
		accountSid: import.meta.env.VITE_TWILIO_ACCOUNT_SID,
		authToken: import.meta.env.VITE_TWILIO_AUTH_TOKEN,
		whatsappFrom: import.meta.env.VITE_TWILIO_WHATSAPP_FROM
	}
} as const