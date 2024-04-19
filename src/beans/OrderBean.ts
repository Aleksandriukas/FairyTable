import { DishBean } from "./DishBean";

export type OrderBean = {
    id: number,
    userNumber: string,
    status: string,
    products: DishBean[]
}