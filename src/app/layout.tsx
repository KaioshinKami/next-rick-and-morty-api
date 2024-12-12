'use client'

import { Karla } from 'next/font/google';
import './globals.css'
import Link from "next/link";
import {Provider} from "react-redux";
import {setupStore} from "@/app/(store)/store";

const karla = Karla({
    subsets: ['latin'],
});

const store=setupStore()


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (

        <html lang="en" className={karla.className}>
        <body>
        <Provider store={store}>
        <div className={'flex gap-[20px] text-2xl text-center justify-center items-center'}>
            <Link href={'/'}>Episodes</Link>
            <Link href={'/characters'}>Characters</Link>
            <Link href={'/locations'}>Locations</Link>
        </div>
        {children}
        </Provider>
        </body>
        </html>
    );
}
