import { LoginForm } from '@/app/components/LoginForm'

export default function RecipientLoginPage() {
  return (
    <LoginForm
      roleBadge="Verified Recipient"
      email="emma.chen@demo.com"
      ctaLabel="Sign in"
      redirectTo="/recipient-view"
    />
  )
}
