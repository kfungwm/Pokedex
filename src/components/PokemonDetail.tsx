'use client'

import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'
import { getTypeColor } from './TypeColor'
import Link from 'next/link'
import Image from 'next/image'

const App = (props: any) => {
  const [loading, setLoading] = useState(true)
  const [pokemonInfo, setPokemonInfo] = useState<{
    id: number
    name: string
    types: { type: { name: string } }[]
  }>({ id: 0, name: '', types: [] })
  const [pokeSpecies, setPokeSpecies] = useState<any>({})

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${props.data.id}`
      )
      const pokemonData = response.data

      setPokeSpecies(pokemonData)
    } catch (error) {
      console.log('Could not fetch data for Pokemon', props.data.id)
    }

    // setAllPokemon(pokemonData)
    // setLoading(false)
  }

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${props.data.id}`)
      .then((res) => {
        const totalPokeInfo = res.data
        setPokemonInfo(totalPokeInfo)
        setLoading(false)
        fetchPokemonData()
      })
  }, [])
  console.log(props.data.id)
  console.log('info', pokemonInfo)
  console.log('info2', pokeSpecies)
  // console.log(allPokemon)
  return (
    <div className="max-w-[1200px] flex mx-auto justify-center items-center  mt-10 ">
      {loading ? (
        <div className="flex h-screen items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex mx-auto w-full p-5 justify-between items-center  rounded-lg  bg-white ">
          <div className="w-[500px] bg-gray-700">Hello</div>
          <div
            className={`w-[500px] rounded-xl border-${getTypeColor(
              pokemonInfo.types[0].type.name
            )} border-4`}
          >
            <div
            // className={`bg-[${getTypeColor(pokemonInfo.types[0].type.name)}]`}
            >
              <div
                className={` px-3 py-4 flex m-1 rounded-lg relative justify-center 
           `}
              >
                {' '}
                {/* <span className=" text-[#9ca3af] text-xs px-2 pt-1 absolute top-0 right-0">
                #{pokemonInfo.id}
              </span> */}
                <div>
                  <div className=" flex justify-center">
                    <div className="text-[#1d4ed8] capitalize font-extrabold mb-1">
                      {' '}
                      {pokemonInfo.name}
                    </div>{' '}
                  </div>
                  <div className="items-center justify-center align-middle self-center bg-white flex">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`}
                      className="w-[150px]"
                      alt={pokemonInfo.name}
                      width={150}
                      height={150}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
