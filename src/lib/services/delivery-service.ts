import { NewsService } from './news-service'
import { SummarizationService } from './summarization-service'
import { WhatsAppService } from './whatsapp-service'
import type { NewsDeliveryPreferences } from '../types'

export class DeliveryService {
	static async processNewsDelivery(userId: string) {
		try {
			// Get user preferences
			const { preferences, error: prefsError } = await NewsService.getDeliveryPreferences(userId)
			if (prefsError || !preferences) {
				console.error('Error getting preferences:', prefsError)
				return { error: prefsError }
			}

			// Fetch news based on topics
			const news = await NewsService.fetchNews(preferences.topics)
			if (news.length === 0) {
				console.log('No news found for the given topics')
				return { error: new Error('No news found') }
			}

			// Summarize news
			const summary = await SummarizationService.summarizeNews(news)
			if (summary === 'Fehler bei der Erstellung der Zusammenfassung.') {
				return { error: new Error('Summarization failed') }
			}

			// Send WhatsApp message
			const { messageSid, error: whatsappError } = await WhatsAppService.sendWhatsAppMessage(
				preferences.whatsappNumber,
				news
			)

			if (whatsappError) {
				console.error('Error sending WhatsApp message:', whatsappError)
				return { error: whatsappError }
			}

			return { messageSid }
		} catch (error) {
			console.error('Error in news delivery process:', error)
			return { error }
		}
	}

	static async scheduleDelivery(userId: string, preferences: NewsDeliveryPreferences) {
		try {
			// Update user preferences
			const { error } = await NewsService.updateDeliveryPreferences(userId, preferences)
			if (error) {
				console.error('Error updating preferences:', error)
				return { error }
			}

			// Schedule immediate delivery if needed
			if (preferences.frequency === 'daily') {
				return this.processNewsDelivery(userId)
			}

			return { scheduled: true }
		} catch (error) {
			console.error('Error scheduling delivery:', error)
			return { error }
		}
	}
}