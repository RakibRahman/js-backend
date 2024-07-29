import { z } from "zod";

export const adminDTO = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  role: z.enum(["admin", "moderator"]),
});

export const adminLoginSchema = z.object({
  body:adminDTO.omit({'name':true,'role':true}),
});

export const adminRegistrationPostSchema = z.object({
  body: adminDTO,
});

export type Admin = z.infer<typeof adminDTO>;
