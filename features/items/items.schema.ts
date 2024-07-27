import { z } from "zod";
import { idNumberRequestSchema } from "../Schema";

export const itemDTO = z.object({
    name:z.string().min(1),
    price:z.coerce.number().int().nonnegative(),
    category:z.string()
})

export const itemPagingRequestSchema = z.object({
    query:z.object({
        page:z.coerce.number().int().nonnegative(),
        size:z.coerce.number().int().nonnegative(),
    })
})

export type ItemDTO = z.infer<typeof itemDTO>;

export const itemPOSTRequestSchema = z.object({
    body:itemDTO
});

export const itemPUTRequestSchema = idNumberRequestSchema.merge(itemPOSTRequestSchema.deepPartial());

