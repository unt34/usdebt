import './global.css'
import { ZCOOL_QingKe_HuangYou } from 'next/font/google'

const font = ZCOOL_QingKe_HuangYou({
    weight: '400',
    subsets: ['latin'],
    display: 'swap'
})

export const metadata = {
    title: 'US National Debt'
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={font.className}>
            <body>
                {children}
            </body>
        </html>
    )
}