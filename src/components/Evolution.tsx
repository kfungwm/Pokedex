'use client '

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

function Type(data: any) {
  const url = data.data
  // console.log(url)

  interface evoStruct {
    name: string
    url: string
  }

  const [firstEvo, setFirstEvo] = useState<evoStruct>({ name: '', url: '' })
  const [secondEvo, setSecondEvo] = useState<any[]>([])
  const [thirdEvo, setThirdEvo] = useState<any[]>([])

  const fetchEvolutionData = (url: string) => {
    axios.get(url).then((res) => {
      const firstStage = res.data.chain.species
      const secondStage = res.data.chain.evolves_to
      const secondData = []
      const thirdData = []

      if (secondStage.length > 0) {
        for (let i = 0; i < secondStage.length; i++) {
          const secondSpecies = res.data.chain.evolves_to[i].species

          secondData.push(secondSpecies)
          if (secondStage[i].evolves_to.length > 0) {
            for (let j = 0; j < secondStage[i].evolves_to.length; j++) {
              const thirdSpecies = secondStage[i].evolves_to[j].species
              thirdData.push(thirdSpecies)
            }
          }
        }
      }
      setFirstEvo(firstStage)
      setSecondEvo(secondData)
      setThirdEvo(thirdData)
    })
  }

  useEffect(() => {
    fetchEvolutionData(url)
  }, [url])

  function onlyId(props: string) {
    const id = props
      .split('/')
      .filter((str: any) => str !== '')
      .pop()
    // console.log('id', id)
    return id
  }

  return (
    <div className="flex w-full justify-between items-center flex-col rounded-xl bg-slate-400 p-4">
      <div className="font-bold ">Evolutions</div>
      <div className="flex flex-col md:flex-row items-center ">
        <div>
          {firstEvo.url && (
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${onlyId(
                firstEvo.url
              )}.png`}
              className=""
              alt={firstEvo.name}
              width={80}
              height={80}
            />
          )}
          <div className="capitalize">{firstEvo.name}</div>
        </div>
        {secondEvo.length > 0 ? (
          <div className="text-[30px] text-white rotate-90 md:rotate-0 md:m-3">
            {' '}
            &gt;{' '}
          </div>
        ) : (
          ''
        )}
        <div
          className={
            secondEvo.length > 2
              ? 'flex justify-center flex-row flex-wrap gap-3'
              : 'flex justify-center flex-row md:flex-col flex-wrap '
          }
        >
          {secondEvo.map((data: any, index: number) => (
            <div key={index}>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${onlyId(
                  data.url
                )}.png`}
                className=""
                alt={data.name}
                width={80}
                height={80}
              />
              <div className="capitalize">{data.name}</div>
            </div>
          ))}
        </div>
        {thirdEvo.length > 0 ? (
          <div className="text-[30px] text-white rotate-90 md:rotate-0 md:m-3">
            &gt;
          </div>
        ) : (
          ''
        )}
        <div className="flex justify-center flex-row md:flex-col flex-wrap">
          {thirdEvo.map((data: any, index: number) => (
            <div key={index}>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${onlyId(
                  data.url
                )}.png`}
                className=""
                alt={data.name}
                width={80}
                height={80}
              />
              <div className="capitalize">{data.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Type
