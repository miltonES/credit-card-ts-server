import type { Request, Response } from "express";
import AuthCreditCardService from "../../services/CreditCard/AuthCreditCardService";

export default class AuthCreditCardController {
  async handle(request: Request, response: Response) {
    const { number, securityCode, expiration } = request.body;

    const authCreditCardService = new AuthCreditCardService();

    const creditCard = await authCreditCardService.execute({
      number,
      securityCode,
      expiration,
    });

    return response.json(creditCard);
  }
}
