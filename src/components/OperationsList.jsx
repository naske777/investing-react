import React, { useState } from 'react';
import deleteIcon from "../assets/delete-svgrepo-com.svg";
import { fetchData } from "../utilities/api";

function OperationsList({ initialOperations , onDelete }) {
  // Inicializa el estado operations con initialOperations
  const [operations, setOperations] = useState(initialOperations);

  const formatDate = (date) => {
    const d = new Date(date),
      year = d.getFullYear(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate();

    return [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
  };

  async function handleDeleteClick(operationId) {
    const response = await fetchData(`transactions/${operationId}/`, {}, "DELETE");
    setOperations(operations.filter(operation => operation.id !== operationId));
    // Llama a la función prop con la respuesta para actualizar el estado en el componente padre
    onDelete(response);
  }

  return (
    <div>
      {Array.isArray(operations) && operations.length > 0 ? (
        operations.map((operation, index) => (
          <div
            key={index}
            className={`operation-card mb-3 ${
              operation.type === "shop" ? "shop" : "sell"
            }`}
          >
            <div className="d-flex-between">
              <h4
                className={`mb-1 ${
                  operation.type === "shop" ? "text-success" : "text-danger"
                }`}
              >
                {operation.type === "shop" ? "Compra" : "Venta"}
              </h4>
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
                <h5 className="">Fecha</h5>{" "}
                {operation.date ? operation.date : formatDate(new Date())}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No hay operaciones para mostrar.</div>
      )}
    </div>
  );
}

export default OperationsList;