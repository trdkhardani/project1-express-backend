export enum UserRole {
    USER = "user",
    ADMIN = "admin",
    SUPERADMIN = "superadmin"
}

export interface UserDataPayload {
    user_id: string,
    user_name: string,
    user_username: string,
    user_email: string,
    user_role: UserRole
}

// export let users: User[] = []