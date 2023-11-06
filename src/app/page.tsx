'use client'

import Image from 'next/image'
import App from '../components/App'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'

export default function Home() {
  return (
    <main className="max-w-[1200px] item-center justify-center text-center mx-auto   flex flex-col min-h-screen">
      <SearchBar />
      <App />

      <Footer />
    </main>
  )
}
