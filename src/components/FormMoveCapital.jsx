import React, { useState } from "react";
import { fetchData } from "../utilities/api";

function MoveCapitalForm({ onCreate }) {
  // Estado para rastrear el tipo de operación seleccionado
  const [operationType, setOperationType] = useState("");
  const valuesCases = {
    "Tomar ganancias (Operador)": 0,
    "Retirar Capital (Inversor)": -1,
    "Inyectar Capital (Inversor)": 0,
  }
  // Manejador para cuando cambia el tipo de operación
  const handleOperationTypeChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOptionText = e.target.options[selectedIndex].text;
    setOperationType(selectedOptionText);  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = {};

    // Itera sobre los valores de formData y los agrega a formValues
    for (let [key, value] of formData.entries()) {
      // Convierte los valores numéricos a números
      formValues[key] = value.match(/^\d+$/) ? parseInt(value, 10) : value;
    }
    formValues.wallet = 1;
    try {
      formValues.outputCurrency = 0;
      console.log(operationType);
      formValues.price = valuesCases[operationType];
      formValues.moneyExitType = "USD";

      // Utiliza fetchData para enviar los datos del formulario
      const response = await fetchData("transactions/", formValues, "POST");

      onCreate(response); // Llama a onCreate con la respuesta si necesitas hacer algo con ella

      // Restablece los valores del formulario
      e.target.reset();
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="type" required onChange={handleOperationTypeChange}>
        <option value="">Tipo de operación</option>
        <option value="sell">Tomar ganancias (Operador)</option>
        <option value="sell">Retirar Capital (Inversor)</option>
        <option value="shop">Inyectar Capital (Inversor)</option>
      </select>

      <select required name="moneyEntryType">
        <option value="">Seleccione moneda a operar</option>
        <option value="USD">USD</option>
        <option value="CUP">CUP</option>
        <option value="MLC">MLC</option>
      </select>

      <input
        className="mb-4"
        placeholder="Cantidad a Retirar/Inyectar"
        type="number"
        name="inputCurrency"
      />
      <button className="button-create" type="submit">
        Crear Operación
      </button>
    </form>
  );
} 

export default MoveCapitalForm;
