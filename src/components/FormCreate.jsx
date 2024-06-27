import React from "react";
import { fetchData } from "../utilities/api";

function OperationForm({ onCreate }) {


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); 
    const formValues = {};
  
    // Itera sobre los valores de formData y los agrega a formValues
    for (let [key, value] of formData.entries()) {
      // Convierte los valores numéricos a números
      formValues[key] = value.match(/^\d+$/) ? parseInt(value, 10) : value;
    }
    formValues.wallet = 1
    try {
      // Utiliza fetchData para enviar los datos del formulario
      const response = await fetchData('transactions/', formValues, 'POST');
      console.log('Transaction created:', response);
      onCreate({response,formValues}); // Llama a onCreate con la respuesta si necesitas hacer algo con ella
      // Restablece los valores del formulario
      e.target.reset();
      // Aquí puedes restablecer el estado del formulario si es necesario
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <select
          name="type"
          required
        >
          <option value="">Tipo de operación</option>
          <option value="shop">Compra</option>
          <option value="sell">Venta</option>
        </select>
      </div>
      <div>
        <select
          required
          name="moneyEntryType"
        >
          <option value="">Seleccione Moneda de Entrada</option>
          <option value="USD">USD</option>
          <option value="CUP">CUP</option>
          <option value="MLC">MLC</option>
        </select>
      </div>
      <div>
        <select
          required
          name="moneyExitType"
        >
          <option value="">Seleccione Moneda de Salida</option>
          <option value="USD">USD</option>
          <option value="CUP">CUP</option>
          <option value="MLC">MLC</option>
        </select>
      </div>
      <div>
        <input
          placeholder="Valor de Entrada"
          type="number"
          name="inputCurrency"
        />
      </div>
      <div>
        <input
          placeholder="Valor de Salida"
          required
          type="number" // Changed from "inputCurrency" to "number" to correct the type
          name="outputCurrency" // Changed from "outputCurrency" to "exitValue" to match state
        />
      </div>
      <button type="submit">Crear Operación</button>
    </form>
  );
}

export default OperationForm;