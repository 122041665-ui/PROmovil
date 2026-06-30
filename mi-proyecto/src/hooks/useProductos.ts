import { useEffect, useState } from 'react';

import { obtenerArtesanos, obtenerProductos } from '../services/artesaniaService';
import { Artesano, Producto } from '../types';

export function useProductos() {
  // Guarda la lista de productos que se mostrara en la pantalla.
  const [productos, setProductos] = useState<Producto[]>([]);

  // Guarda los artesanos para relacionarlos con cada producto.
  const [artesanos, setArtesanos] = useState<Artesano[]>([]);

  // Controla si la informacion todavia se esta cargando.
  const [cargando, setCargando] = useState<boolean>(true);

  // Carga productos y artesanos desde SQLite al iniciar el hook.
  useEffect(() => {
    let activo = true;

    async function cargarDatos() {
      const [productosData, artesanosData] = await Promise.all([
        obtenerProductos(),
        obtenerArtesanos(),
      ]);

      if (activo) {
        setProductos(productosData);
        setArtesanos(artesanosData);
        setCargando(false);
      }
    }

    cargarDatos();

    return () => {
      activo = false;
    };
  }, []);

  // Busca el artesano que corresponde al producto recibido.
  const getArtesano = (artesanoId: number): Artesano | undefined => {
    return artesanos.find((artesano) => artesano.id === artesanoId);
  };

  // Devuelve los datos, el estado de carga y la funcion auxiliar.
  return { productos, cargando, getArtesano };
}
