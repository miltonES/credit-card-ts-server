//* Libraries imports
import { Router } from "express";

//* Local imports
import isAuthenticated from "./middlewares/isAuthenticated";
import CreateCreditCardController from "./controllers/CreditCard/CreateCreditCardController";
import AuthCreditCardController from "./controllers/CreditCard/AuthCreditCardController";

const routes = Router();


// rotas para cartoes de credito
routes.post("/creditcard/add", new CreateCreditCardController().handle); // criar cartao de credito
routes.post("/creditcard/auth", new AuthCreditCardController().handle); // autenticar cartao de credito

// simular compra, se o token for valido, a compra é realizada e se nao, retorna erro de autenticacao
routes.get("/buy", isAuthenticated, (req, res) => {
  return res.json({ message: "Compra realizada com sucesso!" });
});

export { routes };
