import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

import orderModel from "../../models/orders";

import Order from "../../interfaces/order";

export default function OrderDropDown(props) {
    // const [orders, setOrders] = useState<Order[]>([]);
    
    // useEffect(() => {
    //     (async () => {
    //         setOrders(await orderModel.getOrders());
    //     })();
    //   }, []);

    // const orderList = orders
    //     .filter(order => order.status === "Packad" || order.status === "Skickad" )
    //     .map((order, index) => {
    //         return (
    //             <Picker.Item 
    //                 key={index}
    //                 label={order.name}
    //                 value={order.id}
    //             />
    //         );
    //     });
        
    let orderList = props.orderList.map((order, index) => {
        return (
            <Picker.Item 
                key={index}
                label={order.name}
                value={order.id}
            />
        );
    });
        
    orderList.unshift(<Picker.Item key={'i000'} label={'Välj order:'} value={-1} />);
    
    return (
        <Picker 
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoice({...props.invoice, order_id: itemValue});
            }}>
            {orderList}
        </Picker>
    );      
}