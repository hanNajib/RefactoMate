import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RefactoMate - Gemini 2.0 Powered Code Refactoring',
  description: 'Transform and improve your code with RefactoMate, powered by Google Gemini 2.0 Flash. Experience lightning-fast AI code refactoring for cleaner, more efficient code.',
  keywords: 'code refactoring, Gemini 2.0, Google AI, Flash refactoring, code optimization, development tools',
  openGraph: {
    title: 'RefactoMate - Gemini 2.0 Powered Code Refactoring',
    description: 'Experience lightning-fast code refactoring with Google Gemini 2.0 Flash AI',
    url: 'https://refactomate.vercel.app',
    siteName: 'RefactoMate',
    images: [
      {
        url: '/file.svg',
        width: 1200,
        height: 630,
        alt: 'RefactoMate Preview',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RefactoMate - Gemini 2.0 Powered Code Refactoring',
    description: 'Experience lightning-fast code refactoring with Google Gemini 2.0 Flash AI',
    images: ['/file.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://refactomate.vercel.app" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
