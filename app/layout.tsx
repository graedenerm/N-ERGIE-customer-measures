import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: 'Aalberts Surface Technologies \u2014 Energieanalyse-Report | ecoplanet',
  description: 'Statistische Insights und Ma\u00dfnahmenempfehlungen f\u00fcr Aalberts Surface Technologies GmbH \u2014 5 Standorte, 13 Insights, 27 Ma\u00dfnahmen.',
}

export const viewport: Viewport = {
  themeColor: '#00095B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
