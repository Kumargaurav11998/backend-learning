import type { Request, Response } from "express";

interface Product {
  id: number;
  name: string;
}

const products: Product[] = [
  { id: 1, name: "iPhone" },
  { id: 2, name: "Samsung" },
  { id: 3, name: "One Plus" }
];

export const getProductById = (req: Request, res: Response): void => {
  const { id } = req.query;
  
  if (!id) {
    res.status(400).json({ success: false, message: "Product ID is required" });
    return;
  }

  const foundProduct = products.find(p => p.id.toString() === id);
  
  if (!foundProduct) {
    res.status(404).json({ success: false, message: "Product not found" });
    return;
  }

  res.status(200).json({ success: true, product: foundProduct });
};
