import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { UserPreferences } from '@/lib/types'
import { useAuth } from './use-auth'

export function usePreferences() {
	const { user } = useAuth()
	const [preferences, setPreferences] = useState<UserPreferences | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (user) {
			fetchPreferences()
		}
	}, [user])

	const fetchPreferences = async () => {
		if (!user) return

		const { data, error } = await supabase
			.from('user_preferences')
			.select('*')
			.eq('id', user.id)
			.single()

		if (error) {
			console.error('Error fetching preferences:', error)
			return
		}

		setPreferences(data)
		setLoading(false)
	}

	const updatePreferences = async (newPreferences: Partial<UserPreferences>) => {
		if (!user) return { error: new Error('No user logged in') }

		const { error } = await supabase
			.from('user_preferences')
			.upsert({
				id: user.id,
				...newPreferences,
				updated_at: new Date().toISOString()
			})

		if (!error) {
			await fetchPreferences()
		}

		return { error }
	}

	return {
		preferences,
		loading,
		updatePreferences
	}
}