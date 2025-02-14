import { config } from '../config'
import type { NewsItem } from '../types'

export class WhatsAppService {
	private static formatNewsForWhatsApp(news: NewsItem[]): string {
		const intro = "👋 Hier sind deine aktuellen Nachrichten:\n\n"
		const outro = "\n\nBleib informiert! 📰"
		
		const formattedNews = news.map(item => {
			const emoji = this.getTopicEmoji(item.title)
			return `${emoji} *${item.title}*\n${item.description}\nMehr Informationen ➡️ ${item.url}\n`
		}).join('\n')

		return `${intro}${formattedNews}${outro}`
	}

	private static getTopicEmoji(title: string): string {
		// Simple emoji mapping based on keywords
		if (title.toLowerCase().includes('hockey')) return '🏒'
		if (title.toLowerCase().includes('sport')) return '🏅'
		if (title.toLowerCase().includes('politik')) return '🏛️'
		if (title.toLowerCase().includes('wirtschaft')) return '💰'
		return '📰'
	}

	static async sendWhatsAppMessage(to: string, news: NewsItem[]) {
		const { accountSid, authToken, whatsappFrom } = config.twilio
		const messageBody = this.formatNewsForWhatsApp(news)

		try {
			const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`)
				},
				body: new URLSearchParams({
					From: whatsappFrom,
					To: `whatsapp:${to}`,
					Body: messageBody
				})
			})

			const result = await response.json()
			return { messageSid: result.sid }
		} catch (error) {
			console.error('Error sending WhatsApp message:', error)
			return { error }
		}
	}
}