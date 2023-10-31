import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import PokemonDetail from '../../../components/PokemonDetail'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main className="max-w-[1500px] item-center justify-center text-center mx-auto ">
      <div>Hello ID: {params.id}</div>
      <PokemonDetail data={{ id: params.id }} />
    </main>
  )
}
