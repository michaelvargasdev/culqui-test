import { z, ZodString } from "zod";
import fastluhn from "fast-luhn";
import { Card } from "./card";

export const tokenValidation = async (token: string): Promise<void> => {
  try {
    const tokenSchema: ZodString = z.string().length(16);
    tokenSchema.parse(token);
  } catch (error) {
    throw error;
  }
};

export const cardValidation = async (card: Card): Promise<void> => {
  try {
    const cardSchema: any = z.object({
      email: z.string().min(25).max(100).email()
        .refine((val) => val.endsWith("gmail.com") || val.endsWith("hotmail.es") || val.endsWith("yahoo.es"), {
          message: "Email is not provider gmail, hotmail or yahoo",
        }),
      card_number: z.string().min(13).max(16)
        .refine((val) => Number.isInteger(Number(val)), {
          message: "All characters must be numbers",
        }).refine((val) => fastluhn(val), {
          message: "This is not a card number",
        }),
      cvv: z.number()
        .min(100, { message: "String must contain at least 3 character(s)" })
        .max(9999, { message: "String must contain at most 4 character(s)" }),
      expiration_year: z.string().length(4)
        .refine((val) => Number.isInteger(Number(val)), {
          message: "All characters must be numbers",
        }),
      expiration_month: z.string()
        .min(1, { message: "String must contain at least 1 character" })
        .max(2, { message: "String must contain at most 2 character(s)" })
        .refine((val) => Number.isInteger(Number(val)), {
          message: "All characters must be numbers",
        }),
    });

    cardSchema.parse(card);
  } catch (error) {
    throw error;
  }
};
