import { Navigate } from 'react-router-dom'
import { useAuthContext } from './providers/AuthProvider'
import { Loading } from './ui/loading'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { user, loading } = useAuthContext()

	if (loading) {
		return <Loading />
	}

	if (!user) {
		return <Navigate to="/auth" replace />
	}

	return <>{children}</>
}