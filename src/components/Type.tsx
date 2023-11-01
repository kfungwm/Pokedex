'use client '

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getTypeColor } from './TypeColor'
import { darkenColor } from './DarkerColor'
import { lightenColor } from './LighterColor'
import Image from 'next/image'

function Type(data: any) {
  const types = data.data

  return (
    <div className="my-2">
      <div
        className="rounded-xl px-2 py-2"
        style={{
          backgroundColor: lightenColor(getTypeColor(types[0].type.name), 0.5),
        }}
      >
        <div className="flex justify-center rounded-lg w-full gap-1 ">
          <div className="flex w-full flex-col capitalize font-bold rounded-xl p-2  bg-white ">
            <div className="mb-1">Type</div>
            <div className="flex justify-center flex-wrap gap-1 mb-1">
              {types.map((type: any, index: number) => (
                <span
                  key={index}
                  className={` capitalize px-[10px] py-[2px] border border-solid rounded-md text-xs bg-[${getTypeColor(
                    type.type.name
                  )}] text-white`}
                >
                  {type.type.name}{' '}
                </span>
              ))}{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Type
