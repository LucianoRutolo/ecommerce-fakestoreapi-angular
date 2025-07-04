export interface Cart {
    id:       number;
    userId:   number;
    date:     Date;
    products: CartItem[];
    __v:      number;
}

export interface CartItem {
    productId: number;
    quantity:  number;
}