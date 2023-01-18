export interface CreateUserData {
    createUser: {
        success: true,
        message: string;
        email: string;
    }
}

export interface VerifyOtpData {
    verifyOtp: {
        success: true,
        message: string;
        token: string;
        expire: number;
    }
}

export interface ResendOtpData {
    resendOtp: {
        success: boolean;
        message: string;
    }
}

export interface LoginData {
    login: {
        success: boolean;
        message: string;
        token: string;
        expire: number;
    }
}

export interface UsersData {
    id: number;
    firstName: string;
    lastName: string;
    last_seen: Date;
    avatar: {
        url?: string;
    }
}
export interface GetUsersData {
    getUsers: UsersData[]
}

export interface GetProfileData {
    getUser: {
        id: number;
        firstName: string;
        lastName: string;
        avatar: {
            url: string;
        }
        userName: string;
        email: string;
        last_seen: string;
    }
}