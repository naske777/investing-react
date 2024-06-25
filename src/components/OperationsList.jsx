function OperationsList({ operations }) {
  return (
    <div>
      {Array.isArray(operations) && operations.length > 0 ? (
        operations.map((operation, index) => (
          <div
            key={index}
            className={`operation-card mb-3 ${
              operation.type === "Compra" ? "shop" : "sell"
            }`}
          >
            <h4
              className={` mb-1 ${
                operation.type === "Compra" ? "text-success" : "text-danger"
              }`}
            >
              {operation.type}
            </h4>

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
                <h5 className="">Fecha</h5> {operation.date}
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
