export enum Gender {
    MALE = 'male',
    FEMALE ='female'
}

export enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export interface IParams {
    page: number,
    per_page: number
}

export interface IUser {
    id: number,
    name: string,
    email: string,
    gender: Gender,
    status: Status
}

export interface IPost {
    id: number,
    user_id: number,
    title: string,
    body: string
}