import config from "../config/config.json";

import products from "./products";

import Order from "../interfaces/order";
import OrderItem from "../interfaces/order_item";

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order: Order) {
        await Promise.all(order.order_items.map(async (order_item: Partial<OrderItem>) => {
            let updatedProduct = {
                id: order_item.product_id,
                name: order_item.name,
                stock: order_item.stock - order_item.amount,
                api_key: config.api_key,
            };
            
            await products.updateProduct(updatedProduct);
        }));
        
        let updatedOrder = {
            id: order.id,
            name: order.name,
            status_id: 200,
            api_key: config.api_key,
        };
        
        await orders.updateOrder(updatedOrder);
    },
    updateOrder: async function updateOrder(order: Partial<Order>) {
        order.api_key = config.api_key;
        
        try {
            await fetch(`${config.base_url}/orders`, {
                body: JSON.stringify(order),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            });
        } catch (error) {
            console.log("Error occured when updating order.");
        }
    },
};

export default orders;