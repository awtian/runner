import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import GameBoard from '@/components/index/GameBoard'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Just another simple running game</title>
        <meta name="description" content="Just another simple running game by Awtian" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <div className={styles.gameboard}>
          <GameBoard />
          <code className={styles.code}>How to play?</code>
        </div>
      </main>
    </>
  )
}
