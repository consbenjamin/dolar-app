import axios from 'axios';
import NodeCache from 'node-cache';

const myCache = new NodeCache();

export default async (req, res) => {
  try {
    // Verifico si la data ya esta en la cache
    const cacheKey = 'dolarHistoricoData';
    const isCached = myCache.has(cacheKey);

    if (isCached) {
      const cachedData = myCache.get(cacheKey);
      console.log('Data from cache:', cachedData);
      return res.status(200).json(cachedData);
    }

    // Si no esta en la cache, hago un fetch a la API externa
    const response = await axios.get('https://api.argentinadatos.com/v1/cotizaciones/dolares');
    const responseData = response.data;

    if (!Array.isArray(responseData) || responseData.length === 0) {
      console.error('Error: Unexpected format from external API.');
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Suponiendo que la API siempre devuelve una arreglo con datos
    const formattedDataList2 = responseData.map(dolarData => ({
      casa: dolarData.casa,
      compra: dolarData.compra,
      venta: dolarData.venta,
      fecha: dolarData.fecha,
    }));

    // Almacena en caché los datos con un tiempo de vencimiento.
    myCache.set(cacheKey, formattedDataList2, 1800);

    return res.status(200).json(formattedDataList2);
  } catch (error) {
    console.error('Error fetching dollar exchange rate:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
