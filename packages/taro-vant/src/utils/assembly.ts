export function assembly(event: any, value: any) {
  return Object.assign(event, {
    detail: {
      value,
    },
  })
}
