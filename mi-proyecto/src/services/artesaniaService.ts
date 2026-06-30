import { Artesano, Producto } from '../types';

export const artesanos: Artesano[] = [
  {
    id: 1,
    nombre: 'Maria Lopez',
    especialidad: 'Ceramica Talavera',
    imagen: 'https://picsum.photos/id/1011/200',
    ubicacion: 'Puebla, Mexico',
  },
  {
    id: 2,
    nombre: 'Juan Mendez',
    especialidad: 'Textiles Otomi',
    imagen: 'https://picsum.photos/id/1012/200',
    ubicacion: 'Queretaro, Mexico',
  },
  {
    id: 3,
    nombre: 'Rosa Hernandez',
    especialidad: 'Alebrijes',
    imagen: 'https://picsum.photos/id/1013/200',
    ubicacion: 'Oaxaca, Mexico',
  },
];

export const productos: Producto[] = [
  {
    id: 1,
    nombre: 'Jarron Talavera Azul',
    descripcion: 'Jarron hecho a mano con tecnica tradicional de Talavera.',
    imagen: 'https://picsum.photos/id/200/300',
    precioInicial: 500,
    precioActual: 650,
    artesanoId: 1,
    fechaFin: '2026-07-01',
  },
  {
    id: 2,
    nombre: 'Mantel Bordado Otomi',
    descripcion: 'Mantel con bordado a mano con motivos de la cultura Otomi.',
    imagen: 'https://picsum.photos/id/201/300',
    precioInicial: 800,
    precioActual: 950,
    artesanoId: 2,
    fechaFin: '2026-07-05',
  },
  {
    id: 3,
    nombre: 'Alebrije Dragon',
    descripcion: 'Figura de madera pintada a mano representando un dragon.',
    imagen: 'https://picsum.photos/id/202/300',
    precioInicial: 1200,
    precioActual: 1200,
    artesanoId: 3,
    fechaFin: '2026-07-10',
  },
];
