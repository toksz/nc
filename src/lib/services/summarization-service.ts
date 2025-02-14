import { config } from '../config'
import type { NewsItem } from '../types'

export class SummarizationService {
	private static readonly SYSTEM_MESSAGES = [
		{
			role: "system",
			content: "Erstelle eine WhatsApp-taugliche Zusammenfassung der folgenden Nachrichten. Formatiere sie mit fettem Text für Überschriften und Emojis. Du formatierst die Nachricht direkt für WhatsApp. Damit Text fett ist reicht also lediglich ein Stern am Anfang und ein Stern am Ende."
		},
		{
			role: "system",
			content: "Keine nummierten Aufzählungen. Eine Nachricht soll die Struktur haben: (Emoji zum Thema)(Headline in Fett)(Zeilenumbruch)(Kurzbeschreibung des Themas in einem Satz)(Zeilenumbruch)Mehr Informationen ➡️ (Link zum Artikel)(Leerzeile)(Nächster Artikel)."
		},
		{
			role: "system",
			content: "Allgemeine Nachrichten wie <Bleib bei Nachrichtenplatform xy auf dem aktuellen Stand> die keinen Mehrwert bieten kürzt du raus"
		},
		{
			role: "system",
			content: "Doppelte Meldungen kürzt du auch vorher raus. Wir wollen nur relevante Meldungen und keinen Spam der gleichen Sachen oder Werbung für Nachrichtenseiten"
		}
	]

	static async summarizeNews(news: NewsItem[]): Promise<string> {
		const messages = [
			...this.SYSTEM_MESSAGES,
			{
				role: "user",
				content: "Füge auch einen Einleitungssatz am Anfang und einen Ausleitungssatz am Ende hinzu um Authentischer zu wirken. Verwende auf jeden Fall immer weniger als 1600 Zeichen für die gesamte Nachricht!"
			},
			{
				role: "user",
				content: "Hier sind die Nachrichten:"
			},
			...news.slice(0, 10).map(item => ({
				role: "user",
				content: `**${item.title}**\n${item.description}\n➡️ ${item.url}`
			}))
		]

		try {
			const response = await fetch('https://api.openai.com/v1/chat/completions', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${config.openai.apiKey}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					model: config.openai.model,
					messages,
					temperature: 0.7
				})
			})

			const data = await response.json()
			return data.choices[0].message.content
		} catch (error) {
			console.error('Error summarizing news:', error)
			return 'Fehler bei der Erstellung der Zusammenfassung.'
		}
	}
}