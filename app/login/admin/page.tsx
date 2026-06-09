import { LoginForm } from '@/app/components/LoginForm'

export default function AdminLoginPage() {
  return (
    <LoginForm
      roleBadge="Platform Administrator"
      email="admin@demo.com"
      ctaLabel="Sign in"
      redirectTo="/admin"
    />
  )
}
