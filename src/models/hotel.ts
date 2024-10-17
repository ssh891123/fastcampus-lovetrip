export interface Hotel {
  comment: string
  contents: string
  id: string
  images: string[]
  location: { directions: string; pointGeolocation: { y: number; x: number } }
  mainImageUrl: string
  name: string
  price: number
  starRating: number
}
