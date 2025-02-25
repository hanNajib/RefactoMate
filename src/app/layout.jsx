export const metadata = {
    title: "RefactoMate - AI Code Refactoring & Optimization Tool",
    description:
      "RefactoMate is your AI-powered assistant for seamless code refactoring, powered by Google Gemini 2.0 Flash AI. Improve performance, readability, and maintainability with ease.",
    keywords:
      "AI code refactoring, AI developer tools, code optimization, code improvement, automated refactoring, clean code AI, smart coding assistant, software engineering tools, refactomate, RefactoMate, refacto mate, refactoring code",
    openGraph: {
      title: "RefactoMate - AI Code Refactoring Assistant",
      description:
        "RefactoMate helps developers refactor code effortlessly using Google Gemini 2.0 Flash AI, making code cleaner and more efficient.",
      type: "website",
      locale: "en_US",
      url: "https://refactomate.vercel.app",
      siteName: "RefactoMate",
      images: [
        {
          url: "/og_image.png",
          width: 1200,
          height: 630,
          alt: "RefactoMate AI Code Assistant",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "RefactoMate - AI Code Refactoring & Optimization Tool",
      description:
        "AI-powered code refactoring for cleaner, optimized, and more maintainable code.",
      images: [
        {
          url: "/og_image.png",
          alt: "RefactoMate AI Code Assistant",
        },
      ],
    },
    icons: {
      icon: "/file.svg",
    },
  };

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
