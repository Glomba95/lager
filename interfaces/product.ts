export default interface Product {
    id: number,
    article_number: number,
    name: string,
    description: string,
    specifiers: Object,
    stock: number,
    location: string,
    price: number,
};
