import Link from "next/link"
import LanguageSwitcher from "./LanguageSwitcher"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {

  return (

    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Header */}

      <header className="bg-white shadow">

        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

          <Link href="/">
            <h1 className="text-2xl font-bold text-gray-800">
              Recipe Blog
            </h1>
          </Link>

          <LanguageSwitcher />

        </div>

      </header>

      {/* Page Content */}

      <main className="flex-grow max-w-6xl mx-auto p-6 w-full">

        {children}

      </main>

      {/* Footer */}

      <footer className="bg-gray-200 text-center p-4 mt-10">

        Recipe Blog © 2026

      </footer>

    </div>

  )
}