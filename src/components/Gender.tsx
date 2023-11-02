'use client '

import React from 'react'
import { getTypeColor } from './TypeColor'
import { darkenColor } from './DarkerColor'
import { lightenColor } from './LighterColor'

function Gender(props: any) {
  const { data, types } = props
  const gender = data
  const pokeGen = (gender / 8) * 100

  return (
    <div className="flex mx-auto w-full  justify-around gap-2 rounded-lg  bg-white ">
      <div
        className={`w-full md:w-[500px] rounded-xl px-2 py-2
            )} border-4 bg-[${getTypeColor(types[0].type.name)}]`}
        style={{
          borderColor: darkenColor(
            getTypeColor(
              types.length > 1 ? types[1].type.name : types[0].type.name
            ),
            0.7
          ),
        }}
      >
        <div
          className="rounded-xl px-2 py-2"
          style={{
            backgroundColor: lightenColor(
              getTypeColor(types[0].type.name),
              0.5
            ),
          }}
        >
          <div className="bg-white rounded-xl p-2">
            <div className="font-bold mb-1">Gender</div>
            {gender === -1 ? (
              <div>
                <div className="w-full bg-gray-200 py-2 rounded-full dark:bg-grey"></div>
                <span className="text-xs">Gender unknown</span>
              </div>
            ) : (
              <div className="w-full bg-gray-200 rounded-full dark:bg-pink-300">
                <div
                  className={`${
                    100 - pokeGen === 0 ? '' : 'bg-blue-600 '
                  }  text-xs font-medium text-blue-100 text-center py-2 p-0.5 leading-none rounded-full`}
                  style={{ width: `${100 - pokeGen}%` }}
                >
                  {' '}
                </div>
              </div>
            )}{' '}
            <div className="flex justify-center gap-2 mt-2">
              {gender === 0 ? (
                <span className="text-xs">Male {100 - pokeGen}%</span>
              ) : gender === 8 ? (
                <span className="text-xs">Female {pokeGen}%</span>
              ) : gender === -1 ? (
                ''
              ) : (
                <div className="flex justify-center gap-2">
                  <span className="text-xs">{100 - pokeGen}% Male </span>
                  <span className="text-xs">{pokeGen}% Female </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>{' '}
    </div>
  )
}

export default Gender
