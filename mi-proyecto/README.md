# Artisan Auction - Proyecto Integrador

**Programacion Movil - Universidad Politecnica de Queretaro - Mayo-Agosto 2026**  
Ingenieria en Sistemas Computacionales - 9. cuatrimestre

## Descripcion

Aplicacion movil de subastas de artesanias mexicanas desarrollada en React Native con Expo. El proyecto demuestra la implementacion de patrones de diseno profesionales aplicados a una app funcional que consume datos de artesanos y productos en subasta.

## Tecnologias

- React Native
- Expo SDK 56
- Expo SQLite
- TypeScript
- React Navigation v7

## Requisitos previos

- Node.js instalado
- Expo Go instalado en el celular
- VS Code

## Instalacion

```bash
git clone https://github.com/BOWadapter/PM.git
cd PM/mi-proyecto
npm install
npx expo start --clear
```

Escanea el QR con Expo Go desde tu celular.

## Estructura del proyecto

```text
mi-proyecto/
├── App.tsx                     <- Navegacion principal
├── index.ts                    <- Punto de entrada
├── screens/
│   ├── HomeScreen.tsx          <- Lista de subastas con interaccion
│   ├── PerfilScreen.tsx        <- Perfil del usuario
│   ├── ArtesanosScreen.tsx     <- Lista de artesanos
│   ├── PerfilArtesanoScreen.tsx <- Perfil y piezas del artesano
│   └── ConsideracionScreen.tsx <- Informacion del proyecto
├── src/
│   ├── components/             <- Piezas visuales reutilizables
│   ├── database/
│   │   └── db.ts               <- Conexion SQLite, esquema y datos semilla
│   ├── services/
│   │   └── artesaniaService.ts <- Repositorio de consultas SQLite
│   ├── hooks/
│   │   ├── useProductos.ts     <- Custom Hook de productos
│   │   └── useArtesanos.ts     <- Custom Hooks de artesanos
│   └── types/
│       ├── index.ts            <- Tipos TypeScript del dominio
│       └── navigation.ts       <- Tipos de navegacion
├── assets/
├── package.json
└── tsconfig.json
```

## Patrones de diseno implementados

### 1. Separation of Concerns

Cada carpeta tiene una unica responsabilidad:

| Carpeta | Responsabilidad |
| --- | --- |
| `screens/` | Mostrar la interfaz al usuario |
| `src/services/` | Proveer y centralizar los datos |
| `src/types/` | Definir las estructuras de datos |
| `src/components/` | Piezas visuales reutilizables |
| `src/hooks/` | Logica reutilizable entre pantallas |

### 2. Repository Pattern

`artesaniaService.ts` centraliza las consultas a SQLite. Si despues se cambia SQLite por una API real, solo se modifica esta capa y el resto de la app no cambia.

### 3. Custom Hooks

`useProductos.ts` encapsula la logica de obtencion de datos y el estado de carga, separandola de la pantalla. `HomeScreen` ya no sabe si los datos vienen de SQLite, una API o datos de prueba: solo consume el hook.

## Tipos TypeScript - `src/types/index.ts`

```ts
export type Artesano = {
  id: number;
  nombre: string;
  especialidad: string;
  imagen: string;
  ubicacion: string;
};

export type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precioInicial: number;
  precioActual: number;
  artesanoId: number;
  fechaFin: string;
};

export type Oferta = {
  id: number;
  productoId: number;
  usuarioId: number;
  monto: number;
  fecha: string;
};
```

## Conexion SQLite - `src/database/db.ts`

```ts
const db = await SQLite.openDatabaseAsync('artisan_auction.db');
```

`db.ts` abre la base de datos local, crea las tablas `artesanos`, `productos` y `ofertas`, y si la base esta vacia inserta datos semilla.

## Repositorio - `src/services/artesaniaService.ts`

El repositorio expone funciones asincronas:

- `obtenerArtesanos()`
- `obtenerArtesanoPorId(id)`
- `obtenerProductos()`
- `obtenerProductosPorArtesano(artesanoId)`

## Custom Hook - `src/hooks/useProductos.ts`

```ts
import { useEffect, useState } from 'react';

import { obtenerArtesanos, obtenerProductos } from '../services/artesaniaService';
import { Artesano, Producto } from '../types';

export function useProductos() {
  // Guarda la lista de productos que se mostrara en la pantalla.
  const [productos, setProductos] = useState<Producto[]>([]);

  const [artesanos, setArtesanos] = useState<Artesano[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    async function cargarDatos() {
      const [productosData, artesanosData] = await Promise.all([
        obtenerProductos(),
        obtenerArtesanos(),
      ]);

      setProductos(productosData);
      setArtesanos(artesanosData);
      setCargando(false);
    }

    cargarDatos();
  }, []);

  const getArtesano = (artesanoId: number): Artesano | undefined => {
    return artesanos.find((artesano) => artesano.id === artesanoId);
  };

  return { productos, cargando, getArtesano };
}
```

## Pantalla principal - `screens/HomeScreen.tsx`

La pantalla consume el hook con una sola linea:

```tsx
const { productos, cargando, getArtesano } = useProductos();
```

A partir de ahi, `HomeScreen` ya no importa directamente los productos desde el servicio. Solo muestra los datos que entrega el hook.

Mientras los datos cargan, se muestra un indicador:

```tsx
if (cargando) {
  return (
    <View style={styles.centrado}>
      <ActivityIndicator size="large" color="#3b82f6" />
      <Text style={styles.cargandoTexto}>Cargando subastas...</Text>
    </View>
  );
}
```

## Navegacion - `App.tsx`

La app usa navegacion por pestanas con React Navigation:

```tsx
<Tab.Navigator>
  <Tab.Screen name="Subastas" component={HomeScreen} />
  <Tab.Screen name="Perfil" component={PerfilScreen} />
  <Tab.Screen name="Artesanos" component={ArtesanosStack} />
  <Tab.Screen name="Proyecto" component={ConsideracionScreen} />
</Tab.Navigator>
```

La pestana `Artesanos` contiene un Stack anidado:

- `ListaArtesanos`: muestra los artesanos registrados.
- `PerfilArtesano`: muestra el perfil de un artesano y sus piezas en subasta.

## Componentes React Native utilizados

| Componente | Funcion |
| --- | --- |
| `FlatList` | Lista optimizada que solo renderiza elementos visibles |
| `TouchableOpacity` | Interaccion tactil con retroalimentacion visual |
| `Alert` | Dialogos nativos de confirmacion |
| `Image` | Carga de imagenes desde URL |
| `ActivityIndicator` | Spinner de carga mientras se obtienen los datos |

# Custom Hooks en React Native

## Que es un Custom Hook?

Un Custom Hook es una funcion de JavaScript cuyo nombre empieza con `use` y que permite reutilizar logica de estado entre varios componentes. En lugar de repetir el mismo codigo en cada pantalla, ese comportamiento se extrae a una funcion independiente que cualquier componente puede invocar.

Un Custom Hook no devuelve interfaz ni JSX: devuelve datos y funciones. La pantalla se encarga de mostrar; el hook se encarga de la logica.

## Por que usarlos?

En Artisan Auction, `HomeScreen` podria encargarse de obtener productos desde SQLite, buscar artesanos y mostrarlos. Eso mezcla responsabilidades.

Al mover la logica de datos a `useProductos` conseguimos:

- Separacion de responsabilidades: la pantalla solo muestra; el hook gestiona los datos.
- Reutilizacion: si otra pantalla necesita productos, llama al mismo hook.
- Mantenibilidad: cuando se cambie SQLite por una API real, se modifica el hook o el servicio, no toda la pantalla.
- Legibilidad: la pantalla queda mas corta y facil de leer.

## Analisis del codigo

`useState` crea variables de estado. En este hook se declaran dos:

- `productos`: la lista que se mostrara en pantalla. Inicia vacia.
- `cargando`: un booleano que indica si los datos aun se estan obteniendo. Inicia en `true`.

`useEffect` ejecuta la carga inicial de productos y artesanos una sola vez, cuando el componente se monta. El arreglo vacio `[]` indica que el efecto solo corre al inicio.

`getArtesano` recibe un `artesanoId` y devuelve el artesano correspondiente. Se incluye en el hook porque es logica relacionada con los datos.

Finalmente, el hook retorna un objeto con `productos`, `cargando` y `getArtesano`.

## Reglas de los Hooks

1. Solo se llaman en el nivel superior de un componente o de otro Hook. Nunca dentro de condicionales, bucles o funciones anidadas.
2. Solo se llaman desde componentes de React o desde otros Custom Hooks.

La convencion del prefijo `use` permite a las herramientas de desarrollo verificar estas reglas.

## Conexion con los patrones de diseno

| Patron | Archivo | Responsabilidad |
| --- | --- | --- |
| Separation of Concerns | estructura de carpetas | Cada carpeta tiene una responsabilidad |
| Repository Pattern | `src/services/artesaniaService.ts` | Centralizar las consultas a SQLite |
| Custom Hooks | `src/hooks/useProductos.ts` | Encapsular la logica de datos y estado |

## Evidencias sugeridas

- Captura de `src/hooks/useProductos.ts`.
- Captura del uso de `useProductos()` dentro de `screens/HomeScreen.tsx`.
- Captura de la aplicacion funcionando en Expo Go con la lista de subastas.
- Captura de la pestana Artesanos y el perfil de un artesano.

## Rubrica de evaluacion

| Criterio | Puntos |
| --- | ---: |
| Creacion correcta del Custom Hook (`useProductos`) | 25 |
| Uso adecuado de `useState` y `useEffect` | 20 |
| Implementacion correcta de `getArtesano()` | 15 |
| Integracion del hook en `HomeScreen` | 20 |
| Evidencias: capturas y aplicacion funcionando | 10 |
| Reflexion y explicacion de ventajas de los Custom Hooks | 10 |
| **Total** | **100** |

## SQLite y modulo Artesanos

El proyecto ya incluye SQLite y Stack anidado. Las dependencias instaladas son:

```bash
expo-sqlite
@react-navigation/native-stack
```

La pantalla `Subastas` lee productos desde SQLite por medio de `useProductos`. La pantalla `Artesanos` usa `useArtesanos` para mostrar la lista y `useArtesano` para cargar el detalle con sus piezas.
