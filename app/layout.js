import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "श्री कृष्ण जन्मभूमि मुक्ति दल | SKJBMD | आध्यात्मिक और सांस्कृतिक आंदोलन",
  description:
    "SKJBMD एक सामाजिक और धार्मिक संगठन है जिसका उद्देश्य भगवान श्रीकृष्ण की वास्तविक जन्मभूमि की पुनः स्थापना और भारतीय संस्कृति के संरक्षण हेतु कार्य करना है।",
  keywords:
    "SKJBMD, श्रीकृष्ण जन्मभूमि, मथुरा, धार्मिक आंदोलन, हिन्दू धर्म, सनातन धर्म, भारत की संस्कृति, Vrindavan, Krishna Janmabhoomi, Sanatan Dharma, Spiritual Organization",
  authors: [{ name: "SKJBMD", url: "https://skjbmd.org" }],
  creator: "SKJBMD Development Team",
  publisher: "SKJBMD",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "SKJBMD - श्री कृष्ण जन्मभूमि मुक्ति दल",
    description:
      "हमारा उद्देश्य भगवान श्रीकृष्ण की जन्मभूमि की रक्षा एवं पुनःस्थापना करना है। SKJBMD भारतीय संस्कृति और सनातन धर्म के संरक्षण हेतु समर्पित है।",
    url: "https://skjbmd.org",
    siteName: "SKJBMD",
    images: [
      {
        url: "https://skjbmd.org/images/opengraph-image.jpg", // Replace with actual image
        width: 1200,
        height: 630,
        alt: "SKJBMD Banner Image",
      },
    ],
    locale: "hi_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
