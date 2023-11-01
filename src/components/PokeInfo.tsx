'use client '

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getTypeColor } from './TypeColor'
import { darkenColor } from './DarkerColor'
import { lightenColor } from './LighterColor'
import Image from 'next/image'

function Type(props: any) {
  const { data, data2 } = props
  const pokemonInfo = data
  const pokeSpecies = data2

  return (
    <div className="">
      <div className="text-start mb-2">
        {pokeSpecies.flavor_text_entries.length > 0 ? (
          pokeSpecies.flavor_text_entries[0].flavor_text
        ) : (
          <span>
            No Data of <span className="capitalize">{pokemonInfo.name}</span>
          </span>
        )}
      </div>
      <div className="w-full flex justify-around rounded-md bg-[#30a7d7] p-5">
        <ul className="flex flex-col gap-5">
          <li>
            <div className="text-white">Height</div>
            <div className="capitalize font-semibold">
              {pokemonInfo.height * 10} CM
            </div>
          </li>
          <li>
            <div className="text-white">Weight</div>
            <div className="capitalize font-semibold">
              {(pokemonInfo.weight * 0.1).toFixed(2)} KG
            </div>
          </li>
        </ul>
        <ul className="flex flex-col gap-5">
          <li>
            <div className="text-white">Catch rate</div>
            <div className="capitalize font-semibold">
              {pokeSpecies.capture_rate}{' '}
              <span className="text-sm">
                ({((pokeSpecies.capture_rate / 350) * 100).toFixed(2)}%)
              </span>
            </div>
          </li>
          <li>
            <div className="text-white">Abilities</div>
            <div className="capitalize font-semibold">
              {pokemonInfo.abilities[0].ability.name}
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Type
