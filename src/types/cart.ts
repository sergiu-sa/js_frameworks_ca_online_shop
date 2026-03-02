export interface CartItem {
  id: string;
  title: string;
  price: number; // the discounted price - what they actually pay
  image: {
    url: string;
    alt: string;
  };
  quantity: number;
}
