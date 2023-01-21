import OrderItem from "./order_item";

export default interface Order {
    id: number,
    name: string,
    address: string,
    zip: string,
    city: string,
    country: string,
    status: string,
    status_id: number,
    order_items: Array<OrderItem>,
};
