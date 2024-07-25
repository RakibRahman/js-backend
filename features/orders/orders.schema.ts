import { z } from "zod";
import { idNumberRequestSchema } from "../Schema";

export const orderItemDTO = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string(),
});

export const itemsOrderPostReqSchema = idNumberRequestSchema.merge(
  z.object({
    body: z.array(orderItemDTO),
  })
);

export const orderStatusPutRequestSchema = idNumberRequestSchema.merge(
  z.object({
    body:z.object({status: z.string().min(1)}),
  })
);
