import React, { useState } from "react";
import "./App.css";
import Money from "./components/Money";
import OperationsList from "./components/OperationsList";
import Modal from "./components/Modal";
import OperationForm from "./components/FormCreate";

const initialOperations = [
  {
    id: 1,
    type: "Compra",
    inputCurrency: "150",
    outputCurrency: "200",
    moneyEntryType: "USD",
    moneyExitType: "MLC",
    date: "2023-04-01",
  },
  {
    id: 2,
    type: "Venta",
    inputCurrency: "250",
    outputCurrency: "100",
    moneyEntryType: "CUP",
    moneyExitType: "MLC",
    date: "2023-04-02",
  },
];

function App() {
  const [operations, setOperations] = useState(initialOperations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // Define selectedOperation state here
  const [selectedOperation, setSelectedOperation] = useState(null);

  const handleEditClick = () => {
    const operation = operations[0]; // Assumes you want to edit the first operation
    setSelectedOperation(operation);
    setIsModalOpen(true);
  };
  const handleDeleteClick = () => {
    setOperations(operations.slice(1)); // Elimina el primer elemento del array
    setIsDeleteModalOpen(false); // Cierra la modal después de eliminar
  };

  const handleCreateOperation = (operationData) => {
    setOperations([operationData, ...operations]); // Añade la nueva operación al inicio del array
    setIsModalOpen(false); // Cierra la modal después de crear la operación
  };

  return (
    <>
      <Money mlc={10} cup={100} usd={200} />
      <div className="mb-4">
        <button
          className="mb-2 button-create"
          onClick={() => setIsModalOpen(true)}
        >
          Crear Operación
        </button>

        <button
          className="button-edit mb-2"
          onClick={handleEditClick}
        >
          Editar última operación
        </button>
        <button
          className="button-delete"
          onClick={handleDeleteClick}
        >
          Eliminar última operación
        </button>
      </div>
      <OperationsList operations={operations} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <OperationForm onCreate={handleCreateOperation} />
      </Modal>
    </>
  );
}

export default App;