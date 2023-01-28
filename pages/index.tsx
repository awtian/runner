import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import GameBoard from '@/components/index/slider'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>AwTug of War!</title>
        <meta name="description" content="A simple tug of war game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.tugbar}>
          <GameBoard />
        <code className={styles.code}>How to play?</code>
        </div>
      </main>
    </>
  )
}
