/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Pokemon from './Pokemon'
import LoadingSpinner from './LoadingSpinner'
import { getTypeColor } from './TypeColor'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [allPokemon, setAllPokemon] = useState<any>({})

  const fetchPokemonData = async (totalPoke: any) => {
    const pokemonData = {}

    for (let i = 1; i <= totalPoke; i++) {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${i}`
        )
        pokemonData[i] = response.data
      } catch (error) {
        console.log('Could not fetch data for Pokemon', i)
      }
    }

    setAllPokemon(pokemonData)
    setLoading(false)
  }

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokedex/national/').then((res) => {
      console.log('res', res.data.pokemon_entries.length)
      const totalPoke = res.data.pokemon_entries.length

      fetchPokemonData(totalPoke)
    })
  }, [])

  console.log(allPokemon)
  return (
    <div className="flex mx-auto justify-center items-center flex-row flex-wrap ">
      {loading ? (
        <div className="flex h-screen items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex mx-auto justify-center items-center  flex-row flex-wrap ">
          {' '}
          {Object.values(allPokemon).map((pokemon, index) => (
            <div
              key={index}
              className="w-[220px] h-[90px] p-3 bg-white flex m-1 rounded-lg relative justify-between"
            >
              {' '}
              <span className=" text-[#9ca3af] text-xs px-2 pt-1 absolute top-0 right-0">
                #{pokemon.id}
              </span>
              <div className=" text-start">
                <div className="text-[#1d4ed8] capitalize font-extrabold mb-1">
                  {' '}
                  {pokemon.name}
                </div>{' '}
                <div className="flex flex-wrap gap-1 mb-1">
                  {pokemon.types.map((type, index) => (
                    <span
                      key={index}
                      className={` capitalize px-[10px] py-[2px] border border-solid rounded-md text-xs ${getTypeColor(
                        type.type.name
                      )} text-white`}
                    >
                      {type.type.name}{' '}
                    </span>
                  ))}{' '}
                </div>
              </div>
              <div className="items-center justify-center align-middle self-center flex">
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  className="w-[50px]"
                />
              </div>
            </div>
          ))}{' '}
        </div>
      )}
    </div>
  )
}

export default App
