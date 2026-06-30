import * as SQLite from 'expo-sqlite';

import { Artesano, Producto } from '../types';

const artesanosSemilla: Artesano[] = [
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

const productosSemilla: Producto[] = [
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
    precioActual: 1400,
    artesanoId: 3,
    fechaFin: '2026-07-08',
  },
];

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = inicializar();
  }

  return dbPromise;
}

async function inicializar(): Promise<SQLite.SQLiteDatabase> {
  const db = await SQLite.openDatabaseAsync('artisan_auction.db');
  await crearTablas(db);
  await sembrarDatos(db);
  return db;
}

async function crearTablas(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS artesanos (
      id INTEGER PRIMARY KEY NOT NULL,
      nombre TEXT NOT NULL,
      especialidad TEXT,
      imagen TEXT,
      ubicacion TEXT
    );

    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY NOT NULL,
      nombre TEXT NOT NULL,
      descripcion TEXT,
      imagen TEXT,
      precioInicial REAL,
      precioActual REAL,
      artesanoId INTEGER REFERENCES artesanos(id),
      fechaFin TEXT
    );

    CREATE TABLE IF NOT EXISTS ofertas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productoId INTEGER REFERENCES productos(id),
      usuarioId INTEGER,
      monto REAL,
      fecha TEXT
    );
  `);
}

async function sembrarDatos(db: SQLite.SQLiteDatabase): Promise<void> {
  const fila = await db.getFirstAsync<{ total: number }>(
    'SELECT COUNT(*) AS total FROM artesanos',
  );

  if ((fila?.total ?? 0) > 0) {
    return;
  }

  for (const artesano of artesanosSemilla) {
    await db.runAsync(
      'INSERT INTO artesanos (id, nombre, especialidad, imagen, ubicacion) VALUES (?, ?, ?, ?, ?)',
      artesano.id,
      artesano.nombre,
      artesano.especialidad,
      artesano.imagen,
      artesano.ubicacion,
    );
  }

  for (const producto of productosSemilla) {
    await db.runAsync(
      'INSERT INTO productos (id, nombre, descripcion, imagen, precioInicial, precioActual, artesanoId, fechaFin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      producto.id,
      producto.nombre,
      producto.descripcion,
      producto.imagen,
      producto.precioInicial,
      producto.precioActual,
      producto.artesanoId,
      producto.fechaFin,
    );
  }
}
