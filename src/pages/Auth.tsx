import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/components/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

export default function Auth() {
	const [isSignUp, setIsSignUp] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { signIn, signUp } = useAuthContext()
	const navigate = useNavigate()
	const { toast } = useToast()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const { error } = isSignUp 
			? await signUp(email, password)
			: await signIn(email, password)

		if (error) {
			toast({
				variant: "destructive",
				title: "Error",
				description: error.message
			})
		} else {
			navigate('/')
		}
	}

	return (
		<div className="container flex items-center justify-center min-h-screen">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>{isSignUp ? 'Create Account' : 'Sign In'}</CardTitle>
					<CardDescription>
						{isSignUp 
							? 'Create a new account to get started' 
							: 'Sign in to access your personalized news'}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<Input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<Button type="submit" className="w-full">
							{isSignUp ? 'Sign Up' : 'Sign In'}
						</Button>
						<Button
							type="button"
							variant="ghost"
							className="w-full"
							onClick={() => setIsSignUp(!isSignUp)}
						>
							{isSignUp 
								? 'Already have an account? Sign In' 
								: "Don't have an account? Sign Up"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}