import { CreditCardZod } from "../../controllers/CreditCard/CreateCreditCardController";
import p from "../../prisma";

export default class CreditCardService {
  public async create({
    number,
    name,
    expiration,
    securityCode,
  }: CreditCardZod) {
    const creditCard = await p.creditCard.create({
      data: {
        number,
        name,
        expiration,
        securityCode,
      },
      select: {
        id: true,
        number: true,
        name: true,
        expiration: true,
        securityCode: true,
      },
    });

    return creditCard;
  }
}
