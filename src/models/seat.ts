export interface CreateSeatsData {
    theaterId: string, 
    seatRows: number, 
    seatsEachRow: number
}

interface Seats {
    theater_id: string,
    seat_row: string,
    seat_number: number
}

export interface AppendSeatsData {
    theaterId: string,
    // seatsCount: number,
    seats: Seats[]
    // seatRow: string, 
    // seatsNumber: number
}

export interface DeleteSeatsData {
    theaterId: string,
    seats: number
    // seats: [
    //     {
    //         seat_id: number
    //     }
    // ]
}