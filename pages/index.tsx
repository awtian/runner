import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Progress } from '@mantine/core';
import Slider from '@/components/index/slider'

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
    
        {/* <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div> */}

        <div className={styles.tugbar}>
        <Slider />
        <Progress
          radius="xl"
          size={48}
          sections={[
            { value: 50, color: 'red', label: 'Team A', tooltip: 'Team A' },
            { value: 50, color: 'blue', label: 'Team B', tooltip: 'Team B' },
          ]}
        />
        </div>
      </main>
    </>
  )
}
