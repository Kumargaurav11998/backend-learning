import type { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = (await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })) as any;
      
      // Override request inputs with clean, parsed, and validated data
      if (parsed.body) {
        req.body = parsed.body;
      }
      
      if (parsed.query) {
        for (const key in req.query) {
          delete req.query[key];
        }
        Object.assign(req.query, parsed.query);
      }
      
      if (parsed.params) {
        for (const key in req.params) {
          delete req.params[key];
        }
        Object.assign(req.params, parsed.params);
      }
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Request validation failed",
          errors: error.flatten().fieldErrors,
        });
        return;
      }
      next(error);
    }
  };
};
