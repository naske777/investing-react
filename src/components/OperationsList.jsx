import React, { useState, useEffect } from "react";
import deleteIcon from "../assets/delete-svgrepo-com.svg";
import { fetchData } from "../utilities/api";

function OperationsList({ initialOperations, onDelete }) {
  const [operations, setOperations] = useState(initialOperations);

  useEffect(() => {
    setOperations(initialOperations);
  }, [initialOperations]); // Escucha cambios en initialOperations

  async function handleDeleteClick(operationId) {
    const response = await fetchData(
      `transactions/${operationId}/`,
      {},
      "DELETE"
    );
    setOperations(
      operations.filter((operation) => operation.id !== operationId)
    );
    onDelete(response);
  }

  return (
    <div>
      {Array.isArray(operations) && operations.length > 0 ? (
        operations.map((operation, index) =>
          operation.price > 0 ? (
            <div
              key={index}
              className={`operation-card mb-3 ${
                operation.type === "shop" ? "shop" : "sell"
              }`}
            >
              <div className="d-flex-between mb-2">
                <h4
                  className={`mb-1 ${
                    operation.type === "shop" ? "text-success" : "text-danger"
                  }`}
                >
                  {operation.type === "shop" ? "Compra" : "Venta"}
                </h4>
                <div className="f-20 ms-2">({operation.date})</div>
                {index === 0 ? (
                  <img
                    src={deleteIcon}
                    alt="iconDelete"
                    onClick={() => handleDeleteClick(operation.id)}
                  />
                ) : null}
              </div>
              <div className="operation-list">
                <div className="f-30">
                  <h5 className="">
                    Entrada (<span>{operation.moneyEntryType}</span>){" "}
                  </h5>
                  {operation.inputCurrency}
                </div>
                <div className="f-30">
                  <h5 className="">
                    Salida (<span>{operation.moneyExitType}</span>){" "}
                  </h5>
                  {operation.outputCurrency}
                </div>
                <div className="f-20">
                  <h5 className="">Precio</h5> {operation.price}
                </div>
              </div>
            </div>
          ) : (
            <div
              key={index}
              className={`operation-card mb-3 ${
                operation.type === "shop" ? "shop" : "sell"
              }`}
            >
              <div className="d-flex-between mb-2">
                <h4
                  className={`mb-1 ${
                    operation.type === "shop" ? "text-success" : "text-danger"
                  }`}
                >
                  {operation.price === 0 && operation.type === "shop"
                    ? "Inyectar capital (Inv)"
                    : operation.price == -1
                    ? "Retirar capital (Inv)"
                    : "Tomar ganancias (Op)"}
                </h4>
                <div className="f-20 ms-2">({operation.date})</div>
                {index === 0 ? (
                  <img
                    src={deleteIcon}
                    alt="iconDelete"
                    onClick={() => handleDeleteClick(operation.id)}
                  />
                ) : null}
              </div>

              <div className="operation-list">
                <div className="f-30">
                  <h5 className="">
                    Cantidad (<span>{operation.moneyEntryType}</span>){" "}
                  </h5>
                  {operation.inputCurrency}
                </div>
              </div>
            </div>
          )
        )
      ) : (
        <div>No hay operaciones para mostrar.</div>
      )}
    </div>
  );
}

export default OperationsList;
