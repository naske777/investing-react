import React, { useState } from "react";
import { fetchData } from "../utilities/api";

function OperationForm({ onCreate }) {
  // Estado para rastrear el tipo de operación seleccionado
  const [operationType, setOperationType] = useState("");

  // Manejador para cuando cambia el tipo de operación
  const handleOperationTypeChange = (e) => {
    setOperationType(e.target.value);
  };

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
      //Caclula el valor de salida segun el precio y el valor de entrada
      formValues.outputCurrency = formValues.price * formValues.inputCurrency;

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
        <option value="shop">Compra</option>
        <option value="sell">Venta</option>
      </select>

      <select required name="moneyEntryType">
        <option value="">Seleccione moneda a operar</option>
        <option value="USD">USD</option>
        <option value="CUP">CUP</option>
        <option value="MLC">MLC</option>
      </select>

      <select required name="moneyExitType">
        <option value="">
          {operationType === "shop"
            ? "Seleccione moneda de venta"
            : operationType === "sell"
            ? "Seleccione moneda de compra"
            : "Seleccione moneda de compra/venta"}
        </option>
        <option value="USD">USD</option>
        <option value="CUP">CUP</option>
        <option value="MLC">MLC</option>
      </select>

      <input type="number" placeholder="Precio" name="price" step="0.0001" />
      <input
        className="mb-4"
        placeholder="Cantidad a operar"
        type="number"
        name="inputCurrency"
      />
      <button className="button-create" type="submit">
        Crear Operación
      </button>
    </form>
  );
} 

export default OperationForm;
