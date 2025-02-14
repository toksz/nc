import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/components/providers/AuthProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { GraduationCap, Mail } from 'lucide-react'

export default function Auth() {
	const [isSignUp, setIsSignUp] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isStudent, setIsStudent] = useState(false)
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
				title: "Fehler",
				description: error.message
			})
		} else {
			navigate('/')
		}
	}

	return (
		<div className="container flex items-center justify-center min-h-screen">
			<Card className="w-[400px]">
				<CardHeader>
					<CardTitle>{isSignUp ? 'Account erstellen' : 'Anmelden'}</CardTitle>
					<CardDescription>
						{isSignUp 
							? 'Erstelle deinen Account für personalisierte News' 
							: 'Melde dich an und bleib auf dem Laufenden'}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Input
								type="email"
								placeholder="E-Mail"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="focus:ring-primary"
							/>
							<Input
								type="password"
								placeholder="Passwort"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="focus:ring-primary"
							/>
						</div>

						{isSignUp && (
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<input
									type="checkbox"
									id="student"
									checked={isStudent}
									onChange={(e) => setIsStudent(e.target.checked)}
									className="rounded border-gray-300 text-primary focus:ring-primary"
								/>
								<label htmlFor="student" className="flex items-center gap-2">
									<GraduationCap className="w-4 h-4" />
									Ich bin Student/in (50% Rabatt)
								</label>
							</div>
						)}

						<Button type="submit" className="w-full">
							{isSignUp ? 'Kostenlos registrieren' : 'Anmelden'}
						</Button>

						{isSignUp && (
							<p className="text-xs text-gray-500 text-center">
								Mit deiner Registrierung akzeptierst du unsere Nutzungsbedingungen und Datenschutzrichtlinien.
							</p>
						)}

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-white px-2 text-gray-500">oder</span>
							</div>
						</div>

						<Button
							type="button"
							variant="outline"
							className="w-full"
							onClick={() => setIsSignUp(!isSignUp)}
						>
							{isSignUp 
								? 'Du hast bereits einen Account? Anmelden' 
								: 'Noch kein Account? Jetzt registrieren'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}