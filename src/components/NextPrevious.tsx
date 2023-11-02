'use client '

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { getTypeColor } from './TypeColor'
import { darkenColor } from './DarkerColor'
import { lightenColor } from './LighterColor'
import Image from 'next/image'

function PokemonNavigator(data: any) {
  const [prevPokemon, setPrevPokemon] = useState({ id: 0, name: '' })
  const [nextPokemon, setNextPokemon] = useState({ id: 0, name: '' })

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokedex/national/').then((res) => {
      const totalPoke = res.data.pokemon_entries
      const dataId = data.data.id
      if (dataId === totalPoke.length) {
        const firstPoke = totalPoke[0]
        setNextPokemon({
          id: firstPoke.entry_number,
          name: firstPoke.pokemon_species.name,
        })
      } else {
        const nextDetailsId = totalPoke[dataId].entry_number
        const nextDetailsName = totalPoke[dataId].pokemon_species.name
        setNextPokemon({ id: nextDetailsId, name: nextDetailsName })
      }
      if (dataId === 1) {
        const lastPoke = totalPoke[totalPoke.length - 1]
        console.log('lastPoke', lastPoke)
        setPrevPokemon({
          id: lastPoke.entry_number,
          name: lastPoke.pokemon_species.name,
        })
      } else {
        const prevDetailsId = totalPoke[dataId - 2].entry_number
        const prevDetailsName = totalPoke[dataId - 2].pokemon_species.name
        setPrevPokemon({ id: prevDetailsId, name: prevDetailsName })
      }
    })
  }, [data.data.id])

  return (
    <div
      className={`w-full p-1 rounded-2xl border-4 text-xs md:text-sm bg-[${getTypeColor(
        data.data.types[0].type.name
      )}]`}
      style={{
        borderColor: darkenColor(
          getTypeColor(
            data.data.types.length > 1
              ? data.data.types[1].type.name
              : data.data.types[0].type.name
          ),
          0.7
        ),
      }}
    >
      <div className="bg-white rounded-xl py-4">
        <div
          className={`flex justify-around border-y-2`}
          style={{
            borderColor: darkenColor(
              getTypeColor(data.data.types[0].type.name),
              0.7
            ),
            backgroundColor: lightenColor(
              getTypeColor(data.data.types[0].type.name),
              0.5
            ),
          }}
        >
          <div className=" w-full p-2">
            {' '}
            <Link href={`/pokemon/${prevPokemon.id}`}>
              <div className="flex">
                <div className="flex items-center w-1/12 justify-start ">←</div>
                <div className="w-11/12 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="order-2">
                    <span className="capitalize">
                      #{prevPokemon.id}: {prevPokemon.name}
                    </span>
                  </div>
                  <div className="order-1 flex justify-center">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${prevPokemon.id}.png`}
                      className="w-[40px]"
                      alt={nextPokemon.name}
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div
            className="border-x-2 p-4 flex items-center"
            style={{
              borderColor: darkenColor(
                getTypeColor(data.data.types[0].type.name),
                0.7
              ),
            }}
          >
            <Link href="/">Pokemon</Link>
          </div>
          <div className=" w-full p-2">
            {' '}
            <Link href={`/pokemon/${nextPokemon.id}`}>
              <div className="flex">
                <div className=" w-11/12 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="order-2 sm:order-1">
                    <span className="capitalize">
                      #{nextPokemon.id}: {nextPokemon.name}
                    </span>
                  </div>
                  <div className="order-1 sm:order-2 flex justify-center">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${nextPokemon.id}.png`}
                      className="w-[40px]"
                      alt={nextPokemon.name}
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
                <div className="flex items-center w-1/12 justify-end ">→</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonNavigator
