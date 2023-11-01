export function darkenColor(color: string, factor: number) {
  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)

  const darkenedR = Math.round(r * factor)
  const darkenedG = Math.round(g * factor)
  const darkenedB = Math.round(b * factor)

  const darkenedColor = `#${darkenedR.toString(16)}${darkenedG.toString(
    16
  )}${darkenedB.toString(16)}`

  return darkenedColor
}
