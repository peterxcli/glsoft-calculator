/* eslint-disable @next/next/no-css-tags */
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Calculator from '@/component/Calculator'
import { useState } from 'react'
import {themes} from '../themes'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [theme, setTheme] = useState(themes[0].value);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };
  return (
    <>
      <Head>
        <title>Calculator</title>
        <meta name="description" content="Calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/glsoft-calculator/favicon.ico" />
        <link href={`/glsoft-calculator/style/${theme}.css`} rel="stylesheet" lang='scss' />
      </Head>
      <select onChange={handleChange}>
        {themes.map((style) => (
          <option key={style.value} value={style.value}>
            {style.text}
          </option>
        ))}
      </select>
      <Calculator />
    </>
  )
}
