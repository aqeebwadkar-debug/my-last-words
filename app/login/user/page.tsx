import { LoginForm } from '@/app/components/LoginForm'

export default function UserLoginPage() {
  return (
    <LoginForm
      roleBadge="Demo User Account"
      email="sarah.chen@demo.com"
      ctaLabel="Sign in"
      redirectTo="/user"
    />
  )
}
