export const getTypeColor = (type: string): string => {
  switch (type) {
    case 'normal':
      return 'bg-[#a8a87c]'
    case 'fighting':
      return 'bg-[#af383c]'
    case 'flying':
      return 'bg-[#a591ec]'
    case 'poison':
      return 'bg-[#94489d]'
    case 'ground':
      return 'bg-[#dac271]'
    case 'rock':
      return 'bg-[#b3a245]'
    case 'bug':
      return 'bg-[#abb839]'
    case 'ghost':
      return 'bg-[#6d5996]'
    case 'steel':
      return 'bg-[#b8b8cf]'
    case 'fire':
      return 'bg-[#e0893f]'
    case 'water':
      return 'bg-[#738eec]'
    case 'grass':
      return 'bg-[#8bc65b]'
    case 'electric':
      return 'bg-[#f1d34b]'
    case 'psychic':
      return 'bg-[#e46889]'
    case 'ice':
      return 'bg-[#a7d6d8]'
    case 'dragon':
      return 'bg-[#6b39f2]'
    case 'dark':
      return 'bg-[#6c5a4a]'
    case 'fairy':
      return 'bg-[#e19fad]'
    default:
      return 'bg-gray'
  }
}
