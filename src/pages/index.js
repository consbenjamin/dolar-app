import React, { useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DolarGraphic from '../components/DolarGraphic';
import axios from 'axios';

const HomePage = () => {
  const [dolarData, setDolarData] = useState([]);
  const [historicalDolarData, setHistoricalDolarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDolarType, setSelectedDolarType] = useState('blue');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHistoricalData, setSelectedHistoricalData] = useState(null);

  const toggleDolarType = (dolarType) => {
    console.log("Toggle Dolar Type:", dolarType);
    setSelectedDolarType(dolarType);
  };

  const handleDolarTypeChange = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const selectedType = event.target.value;
    toggleDolarType(selectedType);
  
    try {
      // Formatear la fecha seleccionada
      const formattedDate = selectedDate ? `${selectedDate.getFullYear()}/${(selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${selectedDate.getDate().toString().padStart(2, '0')}` : '';
  
      if (formattedDate !== '') {
        // Hacer la solicitud GET a la API
        const response = await axios.get(
          `https://api.argentinadatos.com/v1/cotizaciones/dolares/${selectedType}/${formattedDate}`
        );
        // Obtener los datos de la respuesta
        const data = response.data;
        // Establecer los datos en el estado
        setSelectedHistoricalData(data);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching data for selected date:', error);
      // Manejar el error
      setError('Error fetching data for selected date');
      setSelectedHistoricalData(null);
    }
  };

  const handleDateChange = async (date) => {
    setSelectedDate(date);

    try {
      // Formatear la fecha seleccionada
      const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
      // Hacer la solicitud GET a la API
      const response = await axios.get(
        `https://api.argentinadatos.com/v1/cotizaciones/dolares/${selectedDolarType}/${formattedDate}`
      );
      // Obtener los datos de la respuesta
      const data = response.data;
      // Establecer los datos en el estado
      setSelectedHistoricalData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data for selected date:', error);
      // Manejar el error
      setError('Error fetching data for selected date');
      setSelectedHistoricalData(null);
    }
  };

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const response = await axios.get(url);
        const data = response.data;

        if (!data || !Array.isArray(data) || data.length === 0) {
          console.error(`Error: Data from ${url} is undefined or missing expected format.`);
          setError(`Error: Data from ${url} is undefined or missing expected format.`);
          setLoading(false);
          return;
        }

        setter(data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        setError(`Error fetching data from ${url}`);
        setLoading(false);
      }
    };

    fetchData('/api/dolar', setDolarData);
    fetchData('/api/dolarHistorico', setHistoricalDolarData);
  }, [selectedDolarType]);


  const getDolarByCasa = (casa) => dolarData.find(dolar => dolar.casa === casa);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return (
    <div className=''>
      <h1 className='text-4xl font-bold my-6 text-black rounded-lg'>Cotización Actual Dólar en Argentina</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <img src="../assets/loading.gif" alt="Cargando" />
        </div> ) : error ? <p>Error: {error}</p> : (
        <div>
          <div className="grid md:grid-cols-4 gap-2 grid-cols-1 p-3 md:p-0">
            {['blue', 'oficial', 'bolsa', 'cripto', 'tarjeta', 'contadoconliqui', 'mayorista'].map(casa => (
              <div key={casa} className="col-span-1 md:p-6 p-0 rounded shadow-lg bg-white border-t-green-800 border-t-4">
                <h1 className="font-extrabold uppercase text-2xl md:text-xl mb-2 text-black justify-center flex"> 
                  {getDolarByCasa(casa).nombre.length <= 15 ? `Dólar ${getDolarByCasa(casa).nombre.substring(0, 12)}` 
                  : `${getDolarByCasa(casa).nombre.substring(0, 17)}`} 
                </h1>
                <div className='flex justify-evenly py-2 text-black text-xl font-semibold'>
                  <h2>Compra</h2>
                  <h2>Venta</h2>
                </div>
                <div className='flex justify-evenly text-green-800 font-bold text-3xl md:text-2xl'>
                  <h2>${getDolarByCasa(casa).compra}</h2>
                  <h2>${getDolarByCasa(casa).venta}</h2>
                </div>
                <div className='flex justify-center pt-6'>
                  <p className='text-gray-500 text-xs'>Actualizado: {new Date(getDolarByCasa(casa).fechaActualizacion).toLocaleString('es-ES')}</p>
                </div>
              </div>
              
            ))}
          </div>
          <hr className="my-20 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
          <div className="mb-20">
            <h1 className='text-4xl font-bold my-6 text-black rounded-lg'>Cotización Histórica</h1>
            <label className="ml-4 text-black">Tipo de Dólar:</label>
            <select 
              className="border p-2 ml-2 uppercase focus:border-green-600 rounded-md text-sm font-semibold"
              value={selectedDolarType}
              onChange={handleDolarTypeChange}
            >
              {['blue', 'oficial', 'bolsa', 'cripto', 'tarjeta', 'contadoconliqui', 'mayorista'].map(casa => (
                <option key={casa} value={casa}>
                  {casa === 'contadoconliqui' ? 'Contado...' : casa}
                </option>
              ))}
            </select>


            <label className='ml-4 text-black'>Seleccionar fecha:</label>
            
            <DatePicker
              className="border p-2 ml-2 uppercase hover:border-green-600 rounded-md text-sm w-28"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy"
              popperPlacement="top"
              maxDate={yesterday} 
            />

            {selectedHistoricalData && (
              <div className='ml-4 mt-2'>
                {/* <p className='text-black sm:text-sm md:text-lg'>Cotización histórica para el dólar {selectedDolarType} <span className='font-semibold'>{selectedDate.toLocaleDateString()}</span>:</p> */}
                <div className='mt-2 text-lg'>
                  <p className=' font-semibold text-green-600'>Compra: <span className='font-bold'>${selectedHistoricalData.compra}</span></p>
                  <p className='font-semibold text-red-600'>Venta: <span className='font-bold'>${selectedHistoricalData.venta}</span></p>
                </div>
              </div>
            )}

            <div className=''>
              <DolarGraphic 
                historicalDolarData={historicalDolarData} 
                selectedDolarType={selectedDolarType} 
              />
            </div>
          </div>
        </div>  
      )}
    </div>
  );
};

export default HomePage;
