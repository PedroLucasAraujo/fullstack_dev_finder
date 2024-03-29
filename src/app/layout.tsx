import "./globals.css";
import { Header } from "./header";
import { Providers } from "./provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <Providers>
            <Header />
            {children}
          </Providers>
        </body>
      </html>
    </>
  );
}
