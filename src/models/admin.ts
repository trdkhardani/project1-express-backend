import type { UserRole } from "./user.ts";

export interface AdminDataPayload {
    admin_id: string,
    admin_username: string, 
    admin_email: string, 
    user_role: UserRole, 
    cinema_chain_id?: string
}

export interface CreateMovieData {
    movie_title: string,
    movie_synopsis: string,
    movie_duration: number,
    movie_poster: string
}

export interface UpdateMovieData {
    movie_id: string,
    movie_title?: string,
    movie_synopsis?: string,
    movie_duration?: number,
    movie_poster?: string
}