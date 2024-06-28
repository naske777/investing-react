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


  const handleDeleteOperation = (response) => {
    // Actualiza el estado de currencies con la respuesta
    setCurrencies(response);
  };
  const handleCreateOperation = (data) => {
    const { response, formValues } = data;
    setOperations([formValues, ...operations]);
    setIsModalOpen(false);
    // Actualizar el estado de currencies con el response
    setCurrencies(response);
  };

  return (
    <>
      {/* Pasar currencies como prop a Money */}
      {currencies && <Money conCurrencies={currencies} />}
      <div className="mb-4">
        <button className="mb-2 button-create" onClick={() => setIsModalOpen(true)}>
          Crear Operación
        </button>
      </div>
      {operations && <OperationsList initialOperations={operations} onDelete={handleDeleteOperation} />}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <OperationForm onCreate={handleCreateOperation} />
      </Modal>
    </>
  );
}

export default App;