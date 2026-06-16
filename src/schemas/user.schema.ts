import { z } from "zod";
import { emailRegex, noSpaceRegex } from "../utils/regex";

export const RegisterUserSchema = z.object({
  body: z.object({
    username: z.string({
      message: "Username is required",
    })
    .min(3, "Username must be at least 3 characters")
    .regex(noSpaceRegex, "Username cannot contain spaces"),
    email: z.string({
      message: "Email is required",
    })
    .regex(emailRegex, "Invalid email format"),
    password: z.string({
      message: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
  })
});

export const LoginUserSchema = z.object({
  body: z.object({
    email: z.string({
      message: "Email is required",
    })
    .regex(emailRegex, "Invalid email format"),
    password: z.string({
      message: "Password is required",
    }),
    token: z.string().optional(), // Push token
  })
});

export const GetUserSchema = z.object({
  body: z.object({
    email: z.string({
      message: "Email is required",
    })
    .regex(emailRegex, "Invalid email format"),
  })
});
