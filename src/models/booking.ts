export interface SeatSelections {
    seat_id: number
}

export interface BookSeats {
    showtimeId: string 
    selectedSeats: SeatSelections[]
    userId: string 
    seatCount: number
}