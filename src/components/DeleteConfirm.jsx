
import React from 'react';

function OperationDeleteConfirm({ onConfirm, onCancel }) {
  return (
    <div>
      <p>¿Estás seguro de que quieres eliminar esta operación?</p>
      <button onClick={onConfirm}>Confirmar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
}

export default OperationDeleteConfirm;