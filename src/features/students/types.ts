import { ILesson } from "../classbook/types";

export interface IStudent{
    id:string
    name:string
    surname:string
}

export interface IState {
    list: IStudent[];
}

export type InputLesson = Omit<ILesson, 'id'>