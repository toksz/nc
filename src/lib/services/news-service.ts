import { supabase } from '../supabase'
import { config } from '../config'
import type { NewsDeliveryPreferences, NewsItem } from '../types'

export class NewsService {
	private static buildRagyUrl(query: string) {
		const { apiKey, lang, country, maxSnippetsLength } = config.ragy
		return `https://api.ragy.ai/v1/search?api_key=${apiKey}&q=${query}&lang=${lang}&country=${country}&max_snippets_length=${maxSnippetsLength}`
	}

	static async fetchNews(topics: string[]): Promise<NewsItem[]> {
		const query = topics.join(' OR ')
		const url = this.buildRagyUrl(query)

		try {
			const response = await fetch(url)
			const data = await response.json()
			
			if (!data.results) return []

			return data.results.map((item: any) => ({
				title: item.title,
				description: item.description,
				url: item.url,
				publishedAt: new Date(item.published_at).toISOString(),
				source: item.source
			}))
		} catch (error) {
			console.error('Error fetching news:', error)
			return []
		}
	}

	static async updateDeliveryPreferences(
		userId: string,
		preferences: Partial<NewsDeliveryPreferences>
	) {
		const { error } = await supabase
			.from('user_preferences')
			.update({
				delivery_preferences: preferences,
				updated_at: new Date().toISOString()
			})
			.eq('id', userId)

		return { error }
	}

	static async getDeliveryPreferences(userId: string) {
		const { data, error } = await supabase
			.from('user_preferences')
			.select('delivery_preferences')
			.eq('id', userId)
			.single()

		if (error) return { preferences: null, error }
		return { preferences: data?.delivery_preferences as NewsDeliveryPreferences | null, error: null }
	}
}