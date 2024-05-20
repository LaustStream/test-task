const formatThousands = (value: string | number) => {
  if (typeof value === 'number') value = value.toString()
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export const cleanAmount = (amount: string | number) => {
  if (typeof amount === 'number') amount = amount.toString()

  amount = amount
    .replace(/[^\d.]/g, '')
    .replace(/\./, ' ')
    .replace(/\./g, '')
    .replace(' ', '.')

  if (amount.length > 1) amount = amount.replace(/^0/g, '')
  if (amount[0] === '.') amount = '0' + amount

  return amount
}

export const formatAmount = (amount: string | number, accuracy?: number): string => {
  amount = cleanAmount(amount)
  const splitted = amount.split('.')

  if (splitted.length === 1) return formatThousands(amount)

  const integer = formatThousands(splitted[0])
  const float = splitted[1].slice(0, accuracy ?? 8)

  return [integer, float].join('.')
}
