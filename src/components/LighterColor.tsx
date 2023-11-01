export function lightenColor(color: string, factor: number): string {
  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)

  const lightenedR = Math.round(r + (255 - r) * factor)
  const lightenedG = Math.round(g + (255 - g) * factor)
  const lightenedB = Math.round(b + (255 - b) * factor)

  const lightenedColor = `#${lightenedR.toString(16)}${lightenedG.toString(
    16
  )}${lightenedB.toString(16)}`

  return lightenedColor
}
