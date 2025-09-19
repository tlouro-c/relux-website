import { Raleway } from 'next/font/google'
import localFont from 'next/font/local'

export const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const ppEiko = localFont({
  src: [
    {
      path: '../../public/fonts/PPEiko-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPEiko-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/PPEiko-Heavy.otf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-pp-eiko',
  display: 'swap',
})
