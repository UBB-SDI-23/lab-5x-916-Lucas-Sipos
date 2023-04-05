import {Cars} from "./Cars";

export interface Buyers {
    first_name: string;
    last_name: string;
    age: number;
    sex: string;
    car: Cars[];
}