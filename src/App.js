import React, { useState } from 'react';
import { db } from './firebase';



 import { collection, addDoc} from 'firebase/firestore';
//  import { collection,addDoc, getDoc, getDocs, deleteDoc } from 'firebase/firestore';


import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';



const Formulario = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    telefono: '',
    celular: '',
    email: '',
    paisResidencia: '',
    departamento: '',
    ciudad: '',
    barrio: '',
    calle: '',
    numero: '',
    apto: '',
    codigoPostal: '',
    pais: '',
    tipoDocumento: '',
    numeroDocumento: '',
    fechaNacimiento: null,
    estadoCivil: '',
  });

  const [validations, setValidations] = useState({
    nombres: true,
    apellidos: true,
    telefono: true,
    celular: true,
    email: true,
    paisResidencia: true,
    departamento: true,
    ciudad: true,
    barrio: true,
    calle: true,
    numero: true,
    apto: true,
    codigoPostal: true,
    pais: true,
    tipoDocumento: true,
    numeroDocumento: true,
    fechaNacimiento: true,
    estadoCivil: true,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    let isValid = true;
    let validationMessage = '';

    if (name === 'nombres' || name === 'apellidos') {
      isValid = /^[A-Za-z\s]+$/.test(value); // Verificar que solo contenga letras y espacios
      validationMessage = `Ingrese un valor válido para ${name}. Solo se permiten letras y espacios.`;
    } else if (name === 'telefono' || name === 'celular' || name === 'numero') {
      isValid = /^[0-9]+$/.test(value); // Verificar que solo contenga números
      validationMessage = `Ingrese un valor válido para ${name}. Solo se permiten números.`;
    } else if (name === 'email') {
      isValid = /^\S+@\S+\.\S+$/.test(value); // Verificar que sea un correo electrónico válido
      validationMessage = 'Ingrese un correo electrónico válido.';
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setValidations((prevValidations) => ({
      ...prevValidations,
      [name]: isValid,
    }));

    if (!isValid) {
      toast.error(validationMessage);
    }
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      fechaNacimiento: date,
    }));

    setValidations((prevValidations) => ({
      ...prevValidations,
      fechaNacimiento: date !== null,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar todas las validaciones
    const isValid = Object.values(validations).every((validation) => validation);

    // Actualizar las validaciones de todos los campos
    const updatedValidations = {};

    for (const key in validations) {
      updatedValidations[key] = formData[key] !== '';
    }

    setValidations(updatedValidations);

    // Verificar si todos los campos están llenos
    const isFormComplete = Object.values(formData).every((value) => value !== '');

    if (isValid && isFormComplete) {
      try {
        // Enviar los datos a Firebase

        const dateCollection= collection(db, "Formulario")

        await addDoc(dateCollection, formData)

        setFormData({
          nombres: '',
          apellidos: '',
          telefono: '',
          celular: '',
          email: '',
          paisResidencia: '',
          departamento: '',
          ciudad: '',
          barrio: '',
          calle: '',
          numero: '',
          apto: '',
          codigoPostal: '',
          pais: '',
          tipoDocumento: '',
          numeroDocumento: '',
          fechaNacimiento: null,
          estadoCivil: '',
        }); // Vaciar los campos del formulario

        // Mostrar mensaje de éxito utilizando react-toastify
        toast.success('¡Formulario enviado con éxito!');
      } catch (error) {
        console.error('Error al enviar el formulario', error);
        toast.error('Error al enviar el formulario');
      }
    } else {
      toast.error('Hay campos inválidos o incompletos. Por favor, verifica los datos ingresados.');
    }
  };
  
  
  const countryOptions = [
    { value: 'Argentina', label: 'Argentina' },
    { value: 'Brasil', label: 'Brasil' },
    { value: 'Colombia', label: 'Colombia' },
    { value: 'Paraguay', label: 'Paraguay' },
    { value: 'Uruguay', label: 'Uruguay' },
    { value: 'Venezuela', label: 'Venezuela' },
  ];

  return (
    <div>
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>
        <h2>Datos Filiatorios</h2>
        <div className="form-group">
          <label htmlFor="nombres">
            Nombres
            <input
              type="text"
              id="nombres"
              name="nombres"
              value={formData.nombres}
              onChange={handleInputChange}
              placeholder="Ingrese sus nombres"
            />
            {!validations.nombres && <p className="error">Ingrese un nombre válido. Solo se permiten letras y espacios.</p>}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="apellidos">
            Apellidos
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleInputChange}
              placeholder="Ingrese sus apellidos"
            />
            {!validations.apellidos && <p className="error">Ingrese un apellido válido. Solo se permiten letras y espacios.</p>}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="telefono">
            Teléfono
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="Ingrese su número de teléfono"
            />
            {!validations.telefono && <p className="error">Ingrese un número de teléfono válido. Solo se permiten números.</p>}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="celular">
            Celular
            <input
              type="text"
              id="celular"
              name="celular"
              value={formData.celular}
              onChange={handleInputChange}
              placeholder="Ingrese su número de celular"
            />
            {!validations.celular && <p className="error">Ingrese un número de celular válido. Solo se permiten números.</p>}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Ingrese su dirección de email"
            />
            {!validations.email && <p className="error">Ingrese un correo electrónico válido.</p>}
          </label>
        </div>

        <h2>Datos de Domicilio</h2>
        <div className="form-group">
          <label htmlFor="paisResidencia">
            País de Residencia
            <select
              id="paisResidencia"
              name="paisResidencia"
              value={formData.paisResidencia}
              onChange={handleInputChange}
            >
              <option value ="">Seleccione un país de residencia</option>
              <option value="Argentina">Argentina</option>
              <option value="Brasil">Brasil</option>
              <option value="Colombia">Colombia</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Venezuela">Venezuela</option>
            </select>
            {!validations.paisResidencia && <p className="error">Ingrese un país de residencia válido.</p>}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="departamento">
            Departamento
            <input
              type="text"
              id="departamento"
              name="departamento"
              value={formData.departamento}
              onChange={handleInputChange}
              placeholder="Ingrese su departamento"
            />
            {!validations.departamento && <p className="error">Ingrese un departamento válido.</p>}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="ciudad">
            Ciudad
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleInputChange}
              placeholder="Ingrese su ciudad"
            />
            {!validations.ciudad && <p className="error">Ingrese una ciudad válida.</p>}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="barrio">
            Barrio
            <input
              type="text"
              id="barrio"
              name="barrio"
              value={formData.barrio}
              onChange={handleInputChange}
              placeholder="Ingrese su barrio"
            />
            {!validations.barrio && <p className="error">Ingrese un barrio válido.</p>}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="calle">
            Calle
            <input
              type="text"
              id="calle"
              name="calle"
              value={formData.calle}
              onChange={handleInputChange}
              placeholder="Ingrese su calle"
            />
            {!validations.calle && <p className="error">Ingrese una calle válida.</p>}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="numero">
            Número
            <input
              type="text"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleInputChange}
              placeholder="Ingrese el número"
            />
            {!validations.numero && <p className="error">Ingrese un número válido.</p>}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="apto">
            Apto
            <input
              type="text"
              id="apto"
              name="apto"
              value={formData.apto}
              onChange={handleInputChange}
              placeholder="Ingrese el número de apartamento"
            />
            {!validations.apto && <p className="error">Ingrese un número de apartamento válido.</p>}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="codigoPostal">
            Código Postal
            <input
              type="text"
              id="codigoPostal"
              name="codigoPostal"
              value={formData.codigoPostal}
              onChange={handleInputChange}
              placeholder="Ingrese el código postal"
            />
            {!validations.codigoPostal && <p className="error">Ingrese un código postal válido.</p>}
          </label>
        </div>

        <h2>Datos de Identificación</h2>
        <div className="form-group">
          <label htmlFor="pais">
            País
            <Select
              id="pais"
              name="pais"
              value={countryOptions.find((option) => option.value === formData.pais)}
              options={countryOptions}
              onChange={(selectedOption) =>
                handleInputChange({ target: { name: 'pais', value: selectedOption.value } })
              }
              placeholder="Seleccione su país"
            />
            {!validations.pais && <p className="error">Seleccione un país válido.</p>}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="tipoDocumento">
            Tipo de Documento
            <select
              id="tipoDocumento"
              name="tipoDocumento"
              value={formData.tipoDocumento}
              onChange={handleInputChange}
            >
              <option value="">Seleccione un tipo de documento</option>
              <option value="cedula">Cédula</option>
              <option value="pasaporte">Pasaporte</option>
              <option value="extranjero">Extranjero</option>
              <option value="seguroSocial">Seguro Social (USA)</option>
              <option value="otros">Otros</option>
            </select>
            {!validations.tipoDocumento && <p className="error">Seleccione un tipo de documento válido.</p>}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="numeroDocumento">
            Número de Documento
            <input
              type="text"
              id="numeroDocumento"
              name="numeroDocumento"
              value={formData.numeroDocumento}
              onChange={handleInputChange}
              placeholder="Ingrese su número de documento"
            />
            {!validations.numeroDocumento && (
              <p className="error">Ingrese un número de documento válido. Solo se permiten números.</p>
            )}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="fechaNacimiento">
            Fecha de Nacimiento
            <DatePicker
              id="fechaNacimiento"
              name="fechaNacimiento"
              selected={formData.fechaNacimiento}
              onChange={handleDateChange}
              placeholderText="Seleccione su fecha de nacimiento"
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={70}
              maxDate={new Date()}
            />
            {!validations.fechaNacimiento && <p className="error">Seleccione una fecha de nacimiento válida.</p>}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="estadoCivil">
            Estado Civil
            <select
              id="estadoCivil"
              name="estadoCivil"
              value={formData.estadoCivil}
              onChange={handleInputChange}
            >
              <option value="">Seleccione su estado civil</option>
              <option value="soltero">Soltero/a</option>
              <option value="casado">Casado/a</option>
              <option value="otro">Otro</option>
            </select>
            {!validations.estadoCivil && <p className="error">Seleccione un estado civil válido.</p>}
          </label>
        </div>

        <button type="submit">Enviar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Formulario;
