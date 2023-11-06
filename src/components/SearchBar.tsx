'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'

function SearchBar() {
  type PokemonEntry = {
    entry_number: number
    pokemon_species: {
      name: string
    }
  }

  const [allPokemon, setAllPokemon] = useState<PokemonEntry[]>([])
  const [searchPokemon, setSearchPokemon] = useState('')

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokedex/national/').then((res) => {
      const totalPoke = res.data.pokemon_entries
      setAllPokemon(totalPoke)
    })
  }, [])
  // console.log('all', allPokemon)

  const handleINputChange = (e: any) => {
    const search = e.target.value
    setSearchPokemon(search)
  }

  const updatePokeList = (searchPokemon: any) => {
    if (searchPokemon.length === 0) {
      return []
    } else if (searchPokemon) {
      return allPokemon
        .filter((pokemon) =>
          pokemon.pokemon_species.name
            .toLowerCase()
            .includes(searchPokemon.toLowerCase())
        )
        .map((pokemon) => ({
          entry_number: pokemon.entry_number,
          name: pokemon.pokemon_species.name,
        }))
        .slice(0, 5)
    } else {
      return allPokemon.slice(0, 5)
    }
  }

  return (
    <div className="flex justify-center w-full sticky top-0  bg-slate-400  z-10 p-2">
      <div className="flex justify-center items-center z-10 ">
        <input
          onChange={handleINputChange}
          value={searchPokemon}
          type="text"
          className="border border-[#f3f3f3] bg-[#f3f3f3] outline-none p-3 w-[300px] rounded-3xl"
          placeholder="Search a Pokemon"
        ></input>{' '}
      </div>
      {searchPokemon.length === 0 ? (
        ''
      ) : (
        <div className="absolute pt-7  flex-col ease-in duration-200">
          <div className="relative bg-[#f3f3f3] w-[300px] pt-8 p-4 rounded-b-3xl">
            <ul className="">
              {updatePokeList(searchPokemon).map((pokemon: any) => (
                <Link
                  href={`/pokemon/${pokemon.entry_number}`}
                  key={pokemon.entry_number}
                >
                  <li className="my-4 flex justify-between items-center">
                    <div className="font-start">#{pokemon.entry_number}</div>
                    <div className="capitalize">{pokemon.name}</div>
                    <div>
                      {' '}
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.entry_number}.png`}
                        className="w-[40px]"
                        alt={pokemon.name}
                        width={25}
                        height={25}
                      />
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
