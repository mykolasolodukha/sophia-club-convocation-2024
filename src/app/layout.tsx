import type {Metadata} from "next";
import localFont from "next/font/local";
import {Toaster} from "@/components/ui/toaster"
import "./globals.css";
import {ToastProvider} from "@/components/ui/toast";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Конвокація Клубу \"Софія\" 2024",
    description: "Найбільша щорічна подія Клубу \"Софія\" чекає на тебе.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="uk" className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <head>
            <script defer data-domain="sophia-club-convocation-2024.mykolasolodukha.me"
                    src="https://plausible.mykolasolodukha.me/js/script.js"></script>
        </head>
        <body className="antialiased">
        <ToastProvider>
            <main>{children}</main>

            <Toaster/>
        </ToastProvider>
        </body>

        </html>
    );
}