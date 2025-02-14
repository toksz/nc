import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') {
				// Initialize user preferences if they don't exist
				if (session?.user) {
					supabase
						.from('user_preferences')
						.upsert({
							id: session.user.id,
							topics: [],
							reading_time: 10,
						})
						.then(({ error }) => {
							if (error) console.error('Error initializing preferences:', error)
						})
				}
			}
		})
	}, [])

	return <>{children}</>
}