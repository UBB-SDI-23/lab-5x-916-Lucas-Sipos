import {Cars} from "./Cars";
import {Buyers} from "./Buyers";

export interface DeliveryService {
    id?: number;
    delivery_person: string;
    fee: number;
    date: string;
    pickup: boolean;
    details: string;
    car: number;
    buyer: number;
}