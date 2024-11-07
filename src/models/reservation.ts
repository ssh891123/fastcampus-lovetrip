export interface Reservation {
  userId: string
  hotelId: string
  roomId: string
  startDate: string
  endDate: string
  price: number
  formValue: { [key: string]: string }
}
