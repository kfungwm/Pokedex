import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import PokemonDetail from '../../../components/PokemonDetail'

export async function generateStaticParams() {
  const response = await axios.get('https://pokeapi.co/api/v2/pokedex/national')
  const totalPoke = response.data.pokemon_entries
  const entryNumbers = totalPoke.map((entry: any) => {
    return { id: entry.entry_number.toString() }
  })

  return entryNumbers
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main className="max-w-[1500px] item-center justify-center text-center mx-auto ">
      {/* <div>Hello ID: {params.id}</div> */}
      <PokemonDetail data={{ id: params.id }} />
    </main>
  )
}
