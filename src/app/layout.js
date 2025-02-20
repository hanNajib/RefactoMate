export const metadata = {
  title: 'RefactoMate',
  description: 'Simple Refactoring Code with Gemini AI model',
  icons: {
    icon: "/file.svg",   
},
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
