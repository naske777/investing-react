import React, { useState } from 'react';

function OperationForm({ onCreate }) {
  const [formValues, setFormValues] = useState({
    operationType: '',
    typeMoneyEntry: '',
    typeMoneyExit: '',
    entryValue: '',
    exitValue: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formValues);
    setFormValues({
      operationType: '',
      typeMoneyEntry: '',
      typeMoneyExit: '',
      entryValue: '',
      exitValue: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tipo de Operación:</label>
        <select name="operationType" value={formValues.operationType} onChange={handleChange}>
          <option value="">Seleccione</option>
          <option value="compra">Compra</option>
          <option value="venta">Venta</option>
        </select>
      </div>
      <div>
        <label>Moneda de Entrada:</label>
        <input type="text" name="typeMoneyEntry" value={formValues.typeMoneyEntry} onChange={handleChange} />
      </div>
      <div>
        <label>Moneda de Salida:</label>
        <input type="text" name="typeMoneyExit" value={formValues.typeMoneyExit} onChange={handleChange} />
      </div>
      <div>
        <label>Valor de Entrada:</label>
        <input type="number" name="entryValue" value={formValues.entryValue} onChange={handleChange} />
      </div>
      <div>
        <label>Valor de Salida:</label>
        <input type="number" name="exitValue" value={formValues.exitValue} onChange={handleChange} />
      </div>
      <button type="submit">Crear Operación</button>
    </form>
  );
}

export default OperationForm;