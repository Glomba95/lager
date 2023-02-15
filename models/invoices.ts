import config from "../config/config.json";

import orders from "./orders";
import storage from "./storage";

import Invoice from "../interfaces/invoice";

const invoices = {
    getInvoices: async function getInvoices() {
        const tokenObject: any = await storage.readToken();
    
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': tokenObject.token
            },
        });
        const result = await response.json();

        return result.data;
    },
    createInvoice: async function createInvoice(invoice: Partial<Invoice>) {
        let order = await orders.getOrder(invoice.order_id)
        
        order.status_id = 600;
        
        orders.updateOrder(order);
        
        let totalPrice = order.order_items.reduce((price, item) => {
            return price + item.amount * item.price;
        }, 0);
        
        let dueDate = new Date(invoice.creation_date);
        dueDate.setDate(dueDate.getDate() + 30);
        
        invoice.due_date = dueDate;
        invoice.total_price = totalPrice;
        invoice.api_key = config.api_key;
        
        const tokenObject: any = await storage.readToken();
        
        try {
            const response = await fetch(`${config.base_url}/invoices`, {
                body: JSON.stringify(invoice),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': tokenObject.token
                },
                method: 'POST'
            });
            
            console.log(response);
        
        // invoice.api_key = config.api_key;
        
        // try {
        //     await fetch(`${config.base_url}/invoices`, {
        //         body: JSON.stringify(invoice),
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         method: 'POST'
        //     });
            
        //     let updatedOrder = {
        //         id: invoice.order_id,
        //         name: invoice.name,
        //         status_id: 600,
        //         api_key: config.api_key
        //     };
            
        //     orders.updateOrder(updatedOrder);
            
        } catch (error) {
            console.log("Error occured when creating invoice.");
            console.log(error);
        }
    },
};

export default invoices;