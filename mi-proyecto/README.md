# Artisan Auction - Proyecto Integrador

Programacion Movil - Universidad Politecnica de Queretaro - Mayo-Agosto 2026
Ingenieria en Sistemas Computacionales - 9. cuatrimestre

## Descripcion

Aplicacion movil de subastas de artesanias mexicanas desarrollada en React Native con Expo. El proyecto demuestra la implementacion de patrones de diseno profesionales aplicados a una app funcional que consume datos de artesanos y productos en subasta.

## Tecnologias

- React Native
- Expo SDK 56
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
├── App.tsx
├── index.ts
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── PerfilScreen.tsx
│   │   └── ConsideracionScreen.tsx
│   ├── components/
│   ├── services/
│   │   └── artesaniaService.ts
│   ├── hooks/
│   │   └── useProductos.ts
│   └── types/
│       └── index.ts
├── assets/
├── package.json
└── tsconfig.json
```

## Patrones de diseno implementados

### 1. Separation of Concerns

Cada carpeta tiene una unica responsabilidad:

| Carpeta | Responsabilidad |
| --- | --- |
| screens/ | Mostrar la interfaz al usuario |
| services/ | Proveer y centralizar los datos |
| types/ | Definir las estructuras de datos |
| components/ | Piezas visuales reutilizables |
| hooks/ | Logica reutilizable entre pantallas |

### 2. Repository Pattern

`artesaniaService.ts` centraliza todos los datos en un solo lugar. Cuando se conecte una API real, solo se modifica este archivo y el resto de la app no cambia.

### 3. Custom Hooks

`useProductos.ts` encapsula la logica de obtencion de datos y el estado de carga, separandola de la pantalla. `HomeScreen` solo consume el hook.
