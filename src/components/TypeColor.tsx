export const getTypeColor = (type: string): string => {
  switch (type) {
    case 'normal':
      return '#a8a87c'
    case 'fighting':
      return '#af383c'
    case 'flying':
      return '#a591ec'
    case 'poison':
      return '#94489d'
    case 'ground':
      return '#dac271'
    case 'rock':
      return '#b3a245'
    case 'bug':
      return '#abb839'
    case 'ghost':
      return '#6d5996'
    case 'steel':
      return '#b8b8cf'
    case 'fire':
      return '#e0893f'
    case 'water':
      return '#738eec'
    case 'grass':
      return '#8bc65b'
    case 'electric':
      return '#f1d34b'
    case 'psychic':
      return '#e46889'
    case 'ice':
      return '#a7d6d8'
    case 'dragon':
      return '#6b39f2'
    case 'dark':
      return '#6c5a4a'
    case 'fairy':
      return '#e19fad'
    default:
      return '#010101'
  }
}
