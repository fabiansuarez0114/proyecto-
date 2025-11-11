import './globals.css'

export const metadata = {
  title: 'Proyecto U',
  description: 'Plataforma para proyectos universitarios',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}