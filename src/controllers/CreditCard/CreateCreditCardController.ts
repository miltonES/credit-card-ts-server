import z from "zod";
import CreditCardService from "../../services/CreditCard/CreateCreditCardService";
import type { Request, Response } from "express";

const creditCardSchema = z.object({
  expiration: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/(\d{2})$/,
      "Data de expiração deve estar no formato MM/AA"
    ),

  number: z
    .string()
    .min(16, "Número do cartão deve ter 16 dígitos")
    .max(16, "Número do cartão deve ter 16 dígitos"),
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(255, "Nome deve ter no máximo 255 caracteres"),
  securityCode: z
    .string()
    .min(3, "Código de segurança deve ter pelo menos 3 dígitos")
    .max(4, "Código de segurança deve ter no máximo 4 dígitos"),
});

export type CreditCardZod = z.infer<typeof creditCardSchema>;

export default class CreateCreditCardController {
  public async handle(req: Request, res: Response) {
    try {
      const creditCardData = creditCardSchema.parse(req.body);
      const creditCardService = new CreditCardService();

      const creditCard = await creditCardService.create(creditCardData);

      return res.json(creditCard);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ error: "Invalid information", details: error.errors });
      }
    }
  }
}
