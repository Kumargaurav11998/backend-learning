
import pkg from 'express';
const { Request, Response } = pkg;

export const health = (_req: Request, res: Response): void => {
    res.send("Server Runningdd");
}