import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";

import { App } from "./App";

createServer({
  //models = tables db
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          title: "Freelance de website",
          amount: 6000,
          type: "deposit",
          category: "Dev",
          createdAt: new Date("2021-07-12 09:00:00"),
        },
        {
          title: "Aluguel",
          amount: 1000,
          type: "withdraw",
          category: "Casa",
          createdAt: new Date("2021-07-14 14:00:00"),
        },
      ],
    });
  },
  routes() {
    this.namespace = "api";

    //rota listagem
    this.get("/transactions", () => {
      /*       return [
        {
          id: 1,
          title: 'Transaction 1',
          amount: 200,
          type: "deposit",
          category: 'Food',
          createdAt: new Date()
        }
      ] */

      return this.schema.all("transaction");
    });

    //rota insert
    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody); //converte texto em objeto
      const newData = {
        ...data,
        createdAt: new Date(),
      };

      return schema.create("transaction", newData); //schema = db, transaction = table
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
