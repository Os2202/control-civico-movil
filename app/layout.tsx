import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Control Cívico Móvil',
  description: 'Aplicación para gestión de control cívico',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
