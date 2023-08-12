export enum Gender {
    MALE = 'male',
    FEMALE ='female'
}

export interface IParams {
    page: number,
    per_page: number
}

export interface IUser {
    id: number,
    name: string,
    email: string,
    gender: Gender
}

export interface IPost {
    id: number,
    user_id: number,
    title: string,
    body: string
}