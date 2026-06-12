import type { Request, Response } from 'express-serve-static-core';
interface Products {
  id: number;
  name: string;
}
const product: Products[] = [
  {
    "id":1,
    "name":"iPhone"
  },
  {
    "id":2,
    "name":"Samsung"
  }
]

export const getProduct = (req: Request, res: Response) => {
    console.log("Products endpoint hit",req.params.id, " quri params ::", req.query);
   const id= req.params.id;
   if(!id){
    res.status(400).send("id is required");
    return;
   }else{
    const newProduct: Products| undefined = product.find(p => p.id.toString() === id);
  console.log("Products endpoint hit ::",id);
  if(!newProduct){
    res.status(404).json({error:"Product not found"});
    return;
  }
    res.status(200).json([{success:true,newProduct}]);
}
};