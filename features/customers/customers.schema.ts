import { query } from "express";
import { z } from "zod";

export const customerSearchSchema = z.object({
    params:z.object({
        query:z.string().min(1)
    })
  })