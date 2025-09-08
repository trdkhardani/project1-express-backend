import type { UserRole } from "./user";

export interface AdminDataPayload {
    admin_id: string,
    admin_username: string, 
    admin_email: string, 
    user_role: UserRole, 
    cinema_chain_id?: string
}