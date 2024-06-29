import React, { useState, useEffect } from "react";
import "./App.css";
import Money from "./components/Money";
import OperationsList from "./components/OperationsList";
import Modal from "./components/Modal";
import OperationForm from "./components/FormCreate";
import MoveCapitalForm from "./components/FormMoveCapital";

import { fetchData } from "./utilities/api";

function App() {
  const [operations, setOperations] = useState();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalMoveCapitalOpen, setIsModalMoveCapitalOpen] = useState(false);
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
    const { wallet, transaction } = data;
    setOperations((currentOperations) => [transaction, ...currentOperations]);
    setIsModalCreateOpen(false);
    setIsModalMoveCapitalOpen(false);
    // Actualizar el estado de currencies con el response
    setCurrencies(wallet);
  };

  return (
    <>
      {/* Pasar currencies como prop a Money */}
      {currencies && <Money conCurrencies={currencies} />}

      <div className="mb-4">
        <button className="mb-2 button-create" onClick={() => setIsModalCreateOpen(true)}>
          Crear Operación
        </button>
        <button className="button-create" onClick={() => setIsModalMoveCapitalOpen(true)}>
          Mover Capital
        </button>
      </div>

      {operations && <OperationsList initialOperations={operations} onDelete={handleDeleteOperation} />}
      <Modal isOpen={isModalCreateOpen} onClose={() => setIsModalCreateOpen(false)}>
        <OperationForm onCreate={handleCreateOperation} />
      </Modal>

      <Modal isOpen={isModalMoveCapitalOpen} onClose={() => setIsModalMoveCapitalOpen(false)}>
        <MoveCapitalForm onCreate={handleCreateOperation} />
      </Modal>
    </>
  );
}

export default App;