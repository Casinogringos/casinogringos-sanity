import { Inter, Plus_Jakarta_Sans } from 'next/font/google'

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
    weight: ['400', '500', '600'],
})
export const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-jakarta',
    display: 'swap',
    weight: ['700'],
})