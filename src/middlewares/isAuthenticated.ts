import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import z from "zod";
import env from "../variables";

const authorizationSchema = z.string().nonempty();

export default function isAuthenticatedCard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: "nao autorizado" }).end();

  const authorizationValidated = authorizationSchema.parse(authorization);

  const [, token] = authorizationValidated.split(" ");

  if (!token) return res.status(401).json({ error: "nao autorizado" }).end();

  try {
    const { sub } = verify(token, env.JWT_SECRET);

    if (!sub) return res.status(401).json({ error: "nao autorizado" }).end();

    const subString = typeof sub === "string" ? sub : sub.toString();
    req.credit_card_id = subString;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "nao autorizado" }).end();
  }
}
