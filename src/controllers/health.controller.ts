import type { Request, Response } from "express";

export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).send("Server is running smoothly");
};
