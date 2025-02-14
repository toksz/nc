import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Article } from '@/lib/types'
import { useAuth } from './use-auth'
import { usePreferences } from './use-preferences'

export function useArticles() {
	const { user } = useAuth()
	const { preferences } = usePreferences()
	const [articles, setArticles] = useState<Article[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (user && preferences) {
			fetchArticles()
		}
	}, [user, preferences])

	const fetchArticles = async () => {
		if (!user || !preferences) return

		const { data, error } = await supabase
			.from('articles')
			.select('*')
			.containedBy('topics', preferences.topics)
			.order('published_at', { ascending: false })
			.limit(20)

		if (error) {
			console.error('Error fetching articles:', error)
			return
		}

		setArticles(data || [])
		setLoading(false)
	}

	const markAsRead = async (articleId: string) => {
		if (!user) return { error: new Error('No user logged in') }

		const { error } = await supabase
			.from('reading_history')
			.insert({
				user_id: user.id,
				article_id: articleId
			})

		return { error }
	}

	const getRecommendedArticles = async () => {
		if (!user || !preferences) return { articles: [] }

		const { data, error } = await supabase
			.from('articles')
			.select('*')
			.containedBy('topics', preferences.topics)
			.not('id', 'in', (
				supabase
					.from('reading_history')
					.select('article_id')
					.eq('user_id', user.id)
			))
			.order('published_at', { ascending: false })
			.limit(5)

		if (error) {
			console.error('Error fetching recommended articles:', error)
			return { articles: [] }
		}

		return { articles: data || [] }
	}

	return {
		articles,
		loading,
		fetchArticles,
		markAsRead,
		getRecommendedArticles
	}
}