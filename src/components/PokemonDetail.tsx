'use client'

import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'
import { getTypeColor } from './TypeColor'
import { darkenColor } from './DarkerColor'
import { lightenColor } from './LighterColor'
import NextPrevious from './NextPrevious'
import Gender from './Gender'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Type from './Type'
import PokeInfo from './PokeInfo'
import Evolution from './Evolution'

const App = (props: any) => {
  interface pkmn {
    id: number
    name: string
    types: { type: { name: string } }[]
    abilities: string
    ability: string
    weight: number
    height: number
  }

  interface pkmnExtra {
    genera: any
    names: { name: string }[]
    name: string
    varieties: { variety: { pokemon: string } }[]
    gender_rate: string
    evolution_chain: { url: string }
  }

  const [loading, setLoading] = useState(true)
  const [pokemonInfo, setPokemonInfo] = useState<pkmn>({
    id: 0,
    name: '',
    types: [],
    abilities: '',
    ability: '',
    weight: 0,
    height: 0,
  })
  const [pokeSpecies, setPokeSpecies] = useState<pkmnExtra>({
    genera: '',
    names: [{ name: '' }],
    name: '',
    varieties: [],
    gender_rate: '',
    evolution_chain: { url: '' },
  })
  const fetchPokemonData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${props.data.id}`
      )
      const pokemonData = response.data

      setPokeSpecies(pokemonData)
      setLoading(false)
    } catch (error) {
      console.log('Could not fetch data for Pokemon', props.data.id)
    }
  }, [props.data.id])
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${props.data.id}`)
      .then((res) => {
        const totalPokeInfo = res.data
        setPokemonInfo(totalPokeInfo)

        fetchPokemonData()
      })
  }, [fetchPokemonData, props.data.id])

  // const fetchPokemonData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://pokeapi.co/api/v2/pokemon-species/${props.data.id}`
  //     )
  //     const pokemonData = response.data

  //     setPokeSpecies(pokemonData)
  //     setLoading(false)
  //   } catch (error) {
  //     console.log('Could not fetch data for Pokemon', props.data.id)
  //   }

  //   // setAllPokemon(pokemonData)
  //   // setLoading(false)
  // }

  // useEffect(() => {
  //   axios
  //     .get(`https://pokeapi.co/api/v2/pokemon/${props.data.id}`)
  //     .then((res) => {
  //       const totalPokeInfo = res.data
  //       setPokemonInfo(totalPokeInfo)

  //       fetchPokemonData()
  //     })
  // }, [fetchPokemonData, props.data.id])
  // console.log(props.data.id)

  // console.log('info', pokemonInfo)
  // console.log('info2', pokeSpecies)

  return (
    <div className="max-w-[1200px] flex mx-auto  gap-5 items-center  mt-10 ">
      {loading ? (
        <div className="w-full flex justify-center h-screen items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-2">
          {' '}
          <NextPrevious
            data={{ id: pokemonInfo.id, types: pokemonInfo.types }}
          />
          <div className="flex mx-auto w-full p-5 flex-col items-center md:items-start md:flex-row justify-center md:justify-around gap-5 rounded-lg  bg-white ">
            <div
              className={`w-full md:w-[500px] rounded-xl px-2 py-2
            )} border-4 bg-[${getTypeColor(pokemonInfo.types[0].type.name)}]`}
              style={{
                borderColor: darkenColor(
                  getTypeColor(
                    pokemonInfo.types.length > 1
                      ? pokemonInfo.types[1].type.name
                      : pokemonInfo.types[0].type.name
                  ),
                  0.7
                ),
              }}
            >
              <div
                className="rounded-xl px-2 py-2"
                style={{
                  backgroundColor: lightenColor(
                    getTypeColor(pokemonInfo.types[0].type.name),
                    0.5
                  ),
                }}
              >
                <div className="flex rounded-lg w-full gap-1 justify-around mb-2">
                  <div className="flex w-3/4 capitalize font-extrabold rounded-xl p-2  bg-white ">
                    <div className="flex w-full justify-around">
                      <div className="flex flex-col">
                        <span className="text-xl">{pokemonInfo.name}</span>
                        <span className=" text-sm font-medium">
                          {pokeSpecies.genera.length > 0
                            ? pokeSpecies.genera.find(
                                (genus: any) => genus.language.name === 'en'
                              )?.genus || ''
                            : ''}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        {' '}
                        <span className="text-medium">
                          {pokeSpecies.names[0].name}
                        </span>
                        <span className="text-sm font-medium italic">
                          {pokeSpecies.names[1].name}
                        </span>
                      </div>
                    </div>
                  </div>{' '}
                  <div className="flex w-1/4 capitalize font-extrabold rounded-xl p-2 bg-white justify-center items-center text-xl">
                    {' '}
                    #{pokemonInfo.id}
                  </div>
                </div>
                <div className="items-center justify-center align-middle self-center rounded-xl bg-white flex flex-col">
                  <div className="flex flex-col">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`}
                      className=""
                      alt={pokemonInfo.name}
                      width={250}
                      height={250}
                    />
                    <span className="capitalize text-xs">
                      {pokemonInfo.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 p-2 justify-center">
                    {pokeSpecies.varieties.map(
                      (variety: any, index: number) => {
                        if (index > 0) {
                          const nameWithSpaces = variety.pokemon.name.replace(
                            /-/g,
                            ' '
                          )
                          const url = variety.pokemon.url
                          const numbersId = url
                            .split('/')
                            .filter((str: any) => str !== '')
                            .pop()
                          return (
                            <div key={index} className="flex flex-col">
                              <Image
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numbersId}.png`}
                                className="w-[100px]"
                                alt={nameWithSpaces}
                                width={250}
                                height={450}
                              />
                              <span className="capitalize text-xs">
                                {nameWithSpaces}
                              </span>
                            </div>
                          )
                        }
                        return null
                      }
                    )}
                  </div>
                </div>
              </div>
              <Type data={pokemonInfo.types} />
            </div>
            <div className="w-full md:w-[500px] flex flex-col gap-5 ">
              <PokeInfo data={pokemonInfo} data2={pokeSpecies} />

              <Gender
                data={pokeSpecies.gender_rate}
                types={pokemonInfo.types}
              />

              <Evolution data={pokeSpecies.evolution_chain.url} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
