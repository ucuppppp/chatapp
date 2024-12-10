import "@/styles/globals.css";
import ClientLayout from "./ClientLayout";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
            {children}
        </ClientLayout>
      </body>
    </html>
  );
}
