import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Clone Linktree",
  description: "Aplicação desenvolvida com Next, Typescript, NodeJS com Express, Docker, Prisma, Postgres com intuito de desenvolver habilidades técnicas na web, tanto frontend quanto backend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
