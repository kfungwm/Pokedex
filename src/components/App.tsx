/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'
import { getTypeColor } from './TypeColor'
import Link from 'next/link'
import Image from 'next/image'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [allPokemon, setAllPokemon] = useState({})

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokedex/national/').then((res) => {
      // console.log('res', res.data.pokemon_entries)
      const totalPoke = res.data.pokemon_entries
      setAllPokemon(totalPoke)
      setLoading(false)
    })
  }, [])

  // console.log(allPokemon)
  return (
    <div className="flex mx-auto justify-center items-center flex-row flex-wrap mt-10 ">
      {loading ? (
        <div className="flex h-screen items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex mx-auto justify-center items-center  flex-row flex-wrap ">
          {' '}
          {Object.values(allPokemon).map((pokemon: any, index: number) => (
            <Link href={`/pokemon/${pokemon.entry_number}`} key={index}>
              <div className="w-[150px] h-[110px] px-3 py-4 bg-white flex m-1 rounded-lg relative justify-center shadow-xl">
                {' '}
                <span className=" text-[#9ca3af] text-xs px-2 pt-1 absolute top-0 right-0">
                  #{pokemon.entry_number}
                </span>
                <div>
                  <div className=" flex justify-center">
                    <div className="text-[#1d4ed8] capitalize font-extrabold mb-1">
                      {' '}
                      {pokemon.pokemon_species['name']}
                    </div>{' '}
                  </div>
                  <div className="items-center justify-center align-middle self-center flex">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.entry_number}.png`}
                      className="w-[50px]"
                      alt={pokemon.pokemon_species['name']}
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}{' '}
        </div>
      )}
    </div>
  )
}

export default App
