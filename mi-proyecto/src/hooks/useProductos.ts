import { useEffect, useState } from 'react';

import { artesanos, productos as productosMock } from '../services/artesaniaService';
import { Artesano, Producto } from '../types';

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    setProductos(productosMock);
    setCargando(false);
  }, []);

  const getArtesano = (artesanoId: number): Artesano | undefined => {
    return artesanos.find((artesano) => artesano.id === artesanoId);
  };

  return { productos, cargando, getArtesano };
}
