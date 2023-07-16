import ChakraContextProvider from '../contexts/ChakraContextProvider';
import {SessionProvider} from "next-auth/react"
import './globals.css'
import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({
  subsets: ['latin']})

export const metadata = {
  title: "E-Healthcare",
  description:
    " e-healthcare web application for ordering medicines of different categories",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <SessionProvider>
          <ChakraContextProvider>{children}</ChakraContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
