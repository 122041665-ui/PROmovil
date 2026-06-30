import { useEffect, useState } from 'react';

import {
  obtenerArtesanoPorId,
  obtenerArtesanos,
  obtenerProductosPorArtesano,
} from '../services/artesaniaService';
import { Artesano, Producto } from '../types';

export function useArtesanos() {
  const [artesanos, setArtesanos] = useState<Artesano[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    let activo = true;

    async function cargarArtesanos() {
      const datos = await obtenerArtesanos();

      if (activo) {
        setArtesanos(datos);
        setCargando(false);
      }
    }

    cargarArtesanos();

    return () => {
      activo = false;
    };
  }, []);

  return { artesanos, cargando };
}

export function useArtesano(id: number) {
  const [artesano, setArtesano] = useState<Artesano | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    let activo = true;

    async function cargarArtesano() {
      const [artesanoData, productosData] = await Promise.all([
        obtenerArtesanoPorId(id),
        obtenerProductosPorArtesano(id),
      ]);

      if (activo) {
        setArtesano(artesanoData);
        setProductos(productosData);
        setCargando(false);
      }
    }

    cargarArtesano();

    return () => {
      activo = false;
    };
  }, [id]);

  return { artesano, productos, cargando };
}
