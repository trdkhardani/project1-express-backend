export interface CreateTheaterData {
    theaterCity: string,
    theaterLocation: string,
    cinemaChainId: string
}

export interface UpdateTheaterData {
    theaterId: string,
    theaterCity?: string,
    theaterLocation?: string,
    cinemaChainId?: string
}