const REGEXP = new RegExp('{|}|"', 'g')

export function keys(obj: any) {
  return JSON.stringify(obj).
    replace(REGEXP, '').
    split(',').
    map(function (item) {
      return item.split(':')[0]
    })
}

