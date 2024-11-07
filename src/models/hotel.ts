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
  events: {
    name: string
    promoEndTime?: string
    tagThemeStyle: {
      fontColor: string
      backgroundColor: string
    }
  }
  recommendHotels: string[]
  forms: ReservactionForm[]
}

interface BaseForm {
  id: string
  label: string
  required: string
  helpMessage?: string
}

interface TextFieldForm extends BaseForm {
  type: 'TEXT_FIELD'
}

interface SelectFieldForm extends BaseForm {
  type: 'SELECT'
  options: Array<{ label: string; value: string }>
}

export type ReservactionForm = TextFieldForm | SelectFieldForm
