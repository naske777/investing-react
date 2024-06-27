import React, { useState, useEffect } from "react";
import "./App.css";
import Money from "./components/Money";
import OperationsList from "./components/OperationsList";
import Modal from "./components/Modal";
import OperationForm from "./components/FormCreate";
import { fetchData } from "./utilities/api";

function App() {
  const [operations, setOperations] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [currencies, setCurrencies] = useState({ mlc: 0, usd: 0, cup: 0 });

  useEffect(() => {
    const getOperations = async () => {
      try {
        console.log("running getOperations");
        const data = await fetchData('transactions/');
        setOperations(data);
      } catch (error) {
        console.error("Error fetching operations:", error);
      }
    };
  
    getOperations();
  }, []);


  const handleEditClick = () => {
    const operation = operations[0];
    setSelectedOperation(operation);
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setOperations(operations.slice(1));
    setIsDeleteModalOpen(false);
  };

  const handleCreateOperation = (data) => {
    console.log(data);
    const { response, formValues } = data;
    setOperations([formValues, ...operations]);
    console.log(fromValues);
    console.log(operations);
    setIsModalOpen(false);
    // Actualizar el estado de currencies con el response
    setCurrencies(response);
  };

  return (
    <>
      {/* Pasar currencies como prop a Money */}
      <Money conCurrencies={currencies} />
      <div className="mb-4">
        <button className="mb-2 button-create" onClick={() => setIsModalOpen(true)}>
          Crear Operación
        </button>
        <button className="button-edit mb-2" onClick={handleEditClick}>
          Editar última operación
        </button>
        <button className="button-delete" onClick={handleDeleteClick}>
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