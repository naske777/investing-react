import React, { useState } from 'react';
import './App.css';
import Money from './components/Money';
import OperationsList from './components/OperationsList';
import Modal from './components/Modal'; // Asegúrate de tener la ruta correcta
import OperationForm from './components/FormCreate'; // Asegúrate de tener la ruta correcta

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateOperation = (operationData) => {
    console.log(operationData); // Aquí manejarías la creación de la operación
    setIsModalOpen(false); // Cierra la modal después de crear la operación
  };

  return (
    <>
      <Money mlc={10} cup={100} usd={200} />
      <button onClick={() => setIsModalOpen(true)}>Crear Operación</button>
      <OperationsList />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <OperationForm onCreate={handleCreateOperation} />
      </Modal>
    </>
  );
}

export default App;