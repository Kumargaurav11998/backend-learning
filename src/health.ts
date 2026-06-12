

import type { Request, Response } from 'express-serve-static-core';

export const health = (_req: Request, res: Response): void => {
    res.send("Server Runningdd");
}