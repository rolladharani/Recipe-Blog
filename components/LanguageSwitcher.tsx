import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LanguageSwitcher() {

  const router = useRouter()
  const { asPath } = router

  return (
    <div data-testid="language-switcher" className="flex gap-3">
      <Link href={asPath} locale="en">EN</Link>
      <Link href={asPath} locale="es">ES</Link>
      <Link href={asPath} locale="fr">FR</Link>
    </div>
  )
}