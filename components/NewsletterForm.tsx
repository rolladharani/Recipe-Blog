import { useState } from "react"
import { useTranslation } from "next-i18next"

export default function NewsletterForm() {

  const { t } = useTranslation("common")

  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      setError(t("invalidEmail"))
      setSuccess(false)
      return
    }

    setError("")
    setSuccess(true)
  }

  return (

    <div className="mt-10">

      {!success && (

        <form
          data-testid="newsletter-form"
          className="mt-8 flex gap-3"
          onSubmit={handleSubmit}
        >

          <input
            data-testid="newsletter-email"
            type="email"
            placeholder={t("newsletterPlaceholder")}
            className="border p-2 rounded w-64"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            data-testid="newsletter-submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {t("subscribe")}
          </button>

        </form>

      )}

      {error && (
        <p data-testid="newsletter-error" className="text-red-500">
          {error}
        </p>
      )}

      {success && (
        <p data-testid="newsletter-success" className="text-green-600">
          {t("subscriptionSuccess")}
        </p>
      )}

    </div>
  )
}