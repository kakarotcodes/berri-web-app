import { redirect } from 'next/navigation'

// Redirect to the first guide page
export default function GuidePage() {
  redirect('/guide/getting-started/installation')
}