import React, { useState } from "react";
import Modal from "./Modal";
import OperationEditForm from "./FormEdit";
import OperationDeleteConfirm from "./DeleteConfirm"; 

function OperationsList({ operations, setOperations }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Nuevo estado para la modal de eliminación

  const handleUpdateOperation = (updatedOperation) => {
    setOperations(operations.map(op => {
      if (op.id === updatedOperation.id) { // Assuming each operation has a unique 'id'
        return updatedOperation; // Return the updated operation
      }
      return op; // Return the original operation
    }));
  };
  
  const handleEditClick = (operation) => {
    setSelectedOperation(operation);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (operation) => {
    setSelectedOperation(operation);
    setIsDeleteModalOpen(true); // Abrir la modal de confirmación de eliminación
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false); // Cerrar la modal de eliminación también
    setSelectedOperation(null);
  };

  const handleConfirmDelete = () => {
    setOperations(operations.filter((op) => op !== selectedOperation)); // Eliminar la operación seleccionada
    handleCloseModal();
  };

  return (
    <div>
      {Array.isArray() && operations.length > 0 ? (
        operations.map((operation, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <div>Tipo: {operation.type}</div>
            <div>Moneda de entrada: {operation.inputCurrency}</div>
            <div>Moneda de salida: {operation.outputCurrency}</div>
            <div>Fecha: {operation.date}</div>
            <button onClick={() => handleEditClick(operation)}>Editar</button>
            <button onClick={() => handleDeleteClick(operation)}>
              Eliminar
            </button>
          </div>
        ))
      ) : (
        <div>No hay operaciones para mostrar.</div>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <OperationEditForm
          initialData={selectedOperation}
          onUpdate={handleUpdateOperation}
        />
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseModal}>
        <OperationDeleteConfirm
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default OperationsList;
