export type NewsServiceConfig = {
	ragy: {
		apiKey: string
		query: string
		lang: string
		country: string
		maxSnippetsLength: number
	}
	openai: {
		apiKey: string
		model: string
	}
	twilio: {
		accountSid: string
		authToken: string
		whatsappFrom: string
		whatsappTo: string
	}
}

export type NewsItem = {
	title: string
	description: string
	url: string
	publishedAt: string
	source: string
}

export type NewsDeliveryPreferences = {
	frequency: 'daily' | 'weekly'
	deliveryTime: string
	topics: string[]
	whatsappNumber: string
}

export type UserPreferences = {
	id: string
	topics: string[]
	reading_time: number
	created_at: string
	updated_at: string
}

export type Article = {
	id: string
	title: string
	content: string
	topics: string[]
	source: string
	published_at: string
	created_at: string
}

export type ReadingHistory = {
	id: string
	user_id: string
	article_id: string
	read_at: string
}

export type Database = {
	public: {
		Tables: {
			user_preferences: {
				Row: UserPreferences
				Insert: Omit<UserPreferences, 'created_at' | 'updated_at'>
				Update: Partial<Omit<UserPreferences, 'created_at' | 'updated_at'>>
			}
			articles: {
				Row: Article
				Insert: Omit<Article, 'id' | 'created_at'>
				Update: Partial<Omit<Article, 'id' | 'created_at'>>
			}
			reading_history: {
				Row: ReadingHistory
				Insert: Omit<ReadingHistory, 'id' | 'read_at'>
				Update: Partial<Omit<ReadingHistory, 'id' | 'read_at'>>
			}
		}
	}
}