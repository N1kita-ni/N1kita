export interface ICatalogProduct {
  info: {
    name: string;
    color: string;
    price: number;
    photo: string;
  };
  tags: {
    priceRange: string;
    color: string;
  };
  _id: string;
}
