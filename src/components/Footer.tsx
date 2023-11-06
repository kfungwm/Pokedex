import React from 'react'

const Footer = () => {
  const event = new Date()
  const year = event.getUTCFullYear()

  return (
    <footer className="flex justify-center w-full mx-auto bg-blue-500 p-4 text-xs mt-auto">
      <span>
        {' '}
        Pokémon and All Respective Names are Trademark & © of Nintendo 1996-
        {year}
      </span>
    </footer>
  )
}

export default Footer
