import "./globals.css";
import { ReduxProvider } from "@/lib/provider";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <ReduxProvider>
            {children}
            </ReduxProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
