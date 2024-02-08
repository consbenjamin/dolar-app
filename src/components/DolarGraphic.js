import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const DolarGraphic = ({ historicalDolarData, selectedDolarType }) => {
  // Referencia mutable para el contenedor del gráfico
  const chartContainerRef = useRef(null);
  // Referencia mutable para el objeto de gráfico
  const chartRef = useRef(null);
  // Referencia mutable para la función de redimensionamiento
  const handleResizeRef = useRef(null);

  useEffect(() => {
    const setupChart = () => {
      if (!chartContainerRef.current) return;

      chartRef.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.offsetWidth,
        height: 300,
      });

      // Filtrar los datos históricos según el tipo de dólar seleccionado y ordenarlos por fecha
      const filteredData = historicalDolarData
        .filter((item) => item.casa === selectedDolarType)
        .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());

      // Formateador de precios para la localización
      const myPriceFormatter = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
      }).format;

      // Función de redimensionamiento del gráfico
      const handleResize = () => {
        // Si hay un contenedor y un gráfico, redimensionar el gráfico
        if (chartContainerRef.current && chartRef.current) {
          chartRef.current.resize(chartContainerRef.current.offsetWidth, 300);
        }
      };

      // Añadir el evento de redimensionamiento al objeto window
      window.addEventListener('resize', handleResize);
      // Asignar la función de redimensionamiento a la referencia mutable
      handleResizeRef.current = handleResize;

      // Función para agregar una serie de líneas al gráfico
      const addLineSeries = (data, color, type) => {
        const series = chartRef.current.addLineSeries();
        series.setData(data);
        series.applyOptions({
          color,
          priceLineVisible: false,
        });
        return series;
      };

      // Crear datos de compra y agregar la serie de líneas correspondiente al gráfico
      const compraData = filteredData.map(item => ({
        time: new Date(item.fecha).getTime() / 1000,
        value: item.compra,
        type: 'Compra',
      }));

      // Crear datos de venta y agregar la serie de líneas correspondiente al gráfico
      const ventaData = filteredData.map(item => ({
        time: new Date(item.fecha).getTime() / 1000,
        value: item.venta,
        type: 'Venta',
      }));

      addLineSeries(compraData, 'green', 'Compra');
      addLineSeries(ventaData, 'red', 'Venta');

      // Aplicar opciones adicionales al gráfico
      chartRef.current.applyOptions({
        localization: {
          timeFormatter: (timestamp) => new Date(timestamp * 1000).toLocaleString('es-ES'),
          priceFormatter: myPriceFormatter,
        },
      });

      // Redimensionar el gráfico después de la configuración inicial
      handleResize();
    };

    // Llamar a la función de configuración del gráfico
    setupChart();

    // Función de limpieza que se ejecuta al desmontar el componente
    return () => {
      // Si hay un gráfico, quitar el evento de redimensionamiento y eliminar el gráfico
      if (chartRef.current) {
        window.removeEventListener('resize', handleResizeRef.current);
        chartRef.current.remove();
      }
    };
  }, [historicalDolarData, selectedDolarType]);

  return <div className='' ref={chartContainerRef}></div>
};

export default DolarGraphic;
