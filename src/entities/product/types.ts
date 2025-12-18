export interface ProductAttributes {
  heightCm?: number;
  heightM?: number;
  diameterCm?: number;
  type: string;
  material: string;
  color?: string;
  stock: 'in_stock' | 'preorder' | 'out_of_stock';
  care?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  currency: 'UZS' | 'USD' | 'RUB';
  images: string[];
  shortDesc: string;
  fullDesc: string;
  attributes: ProductAttributes;
  tags: string[];
  category: string;
  seo: {
    title: string;
    description: string;
  };
}