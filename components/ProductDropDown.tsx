import { Picker } from '@react-native-picker/picker';

export default function ProductDropDown(props) {
    let productsHash: any = {};

    const itemsList = props.products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    itemsList.unshift(<Picker.Item key={'i000'} label={'Välj produkt'} value={-1} />);

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}