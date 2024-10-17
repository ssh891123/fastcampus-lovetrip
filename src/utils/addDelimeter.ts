function addDelimeter(value: number | string, delimiter = ','): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
}

export default addDelimeter
