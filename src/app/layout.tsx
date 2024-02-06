import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@redux/provider'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Whisper Sentiment',
  description: 'ML-powered speech recognition and sentiment analysis',
  viewport: "width=device-width, initial-scale=1",
  manifest: "/manifest.json",
  keywords: ["nextjs", "pwa", "next-pwa"],
  icons: [
    { rel: "icon", url: "/icon.png" },
    { rel: "icon", url: "/icon-144.png" },
    { rel: "icon", url: "/icon-192.png" }
  ],
}

export const viewport: Viewport = {
  themeColor: "#000000",

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  )
}
