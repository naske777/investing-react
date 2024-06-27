import React, { useEffect, useState } from "react";
import { fetchData } from "../utilities/api";

function Money({ conCurrencies }) {
  const [currencies, setCurrencies] = useState({ mlc: 0, usd: 0, cup: 0 });

  useEffect(() => {
    const isValidConCurrencies = conCurrencies && conCurrencies.mlc && conCurrencies.usd  && conCurrencies.cup;

    if (isValidConCurrencies) {
      setCurrencies(conCurrencies);
    } else {
      const loadData = async () => {
        try {
          const data = await fetchData('wallets/1/');
          setCurrencies(data); // Asume que la respuesta es un objeto con las propiedades mlc, usd, y cup
        } catch (error) {
          console.error("Error al cargar los datos de las monedas:", error);
        }
      };

      loadData();
    }
  }, [conCurrencies]); // Añadir conCurrencies a la lista de dependencias para reaccionar a cambios

  return (
    <div className="d-flex-evenly money-content mb-4">
      <div className="money">
        MLC: <strong> {currencies.mlc} </strong>
      </div>
      <div className="money">
        USD: <strong>{currencies.usd} </strong>
      </div>
      <div className="money">
        CUP: <strong>{currencies.cup} </strong>
      </div>
    </div>
  );
}

export default Money;