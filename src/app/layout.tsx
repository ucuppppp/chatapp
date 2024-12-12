import "@/styles/globals.css";
import ClientLayout from "./ClientLayout";

export default function RootLayout({children,  modal}: {children: React.ReactNode, modal: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
            {modal}
            {children}
        </ClientLayout>
      </body>
    </html>
  );
}
