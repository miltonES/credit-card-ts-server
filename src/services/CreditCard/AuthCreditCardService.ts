//* Libraries imports
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

//* Local imports
import p from "../../prisma";
import env from "../../variables";

type AuthRequest = {
  number: string;
  expiration: string;
  securityCode: string;
};

type AuthResponse = {
  token: string;
  card: {
    id: string;
    number: string;
    expiration: string;
    securityCode: string;
  };
};

export default class AuthCreditCardService {
  async execute({
    number,
    expiration,
    securityCode,
  }: AuthRequest): Promise<AuthResponse> {
    const card = await p.creditCard.findFirst({
      where: {
        number,
        expiration,
        securityCode,
      },
    });

    if (!card) throw new Error("Cartao nao encontrado");

    const token = sign(
      {
        id: card.id,
        number: card.number,
        expiration: card.expiration,
        securityCode: card.securityCode,
      },
      env.JWT_SECRET,
      {
        subject: card.id,
        expiresIn: "30d",
      }
    );

    return {
      token,
      card: {
        id: card.id,
        number: card.number,
        expiration: card.expiration,
        securityCode: card.securityCode,
      },
    };
  }
}
