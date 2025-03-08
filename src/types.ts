export interface Cookie {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  nutrition: {
    protein: number;
    calories: number;
    carbs: number;
    fats: number;
  };
  ingredients: string[];
}

export interface CartItem {
  cookie: Cookie;
  quantity: number;
}