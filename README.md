# Repositorio Frontend | Reto: Gestión de eventos culturales

## Descripción del reto

En Medellín, muchos artistas independientes enfrentan dificultades para organizar presentaciones, ya que deben coordinar múltiples actores (sonido, transporte, equipos, personal), en procesos informales y fragmentados que limitan su circulación.

El reto es crear una plataforma que permita a los artistas independientes coordinar de manera eficiente los recursos y actores necesarios para organizar sus presentaciones en la ciudad.

## Estilo de arquitectura

El proyecto se desarrollará como un SPA (Single Page Application) bajo un modelo cliente-servidor, adaptando una arquitectura basada en componentes. Esta elección se debe a la necesidad de ofrecer una experiencia de usuario fluida y dinámica, permitiendo a los artistas gestionar sus eventos sin interrupciones ni recargas de página. La arquitectura basada en componentes facilita la reutilización de código, mejora la mantenibilidad y permite una mejor organización del proyecto.

## Justificación de la elección de la arquitectura

- **Modelo cliente-servidor**: Permite una clara separación entre la lógica de presentación (frontend) y la lógica de negocio (backend), lo que facilita el desarrollo, mantenimiento y escalabilidad del proyecto. El frontend se encargará de la interfaz de usuario y la interacción, mientras que el backend gestionará la lógica de negocio, la base de datos y las APIs.

- **SPA (Single Page Application)**: Permite una experiencia de usuario más fluida y rápida, ya que no requiere recargas completas de la página. Esto es crucial para una plataforma de gestión de eventos, donde los usuarios necesitan interactuar con múltiples funcionalidades sin interrupciones.

- **Arquitectura basada en componentes**: Facilita la modularidad y reutilización del código, lo que mejora la mantenibilidad del proyecto. Cada componente puede ser desarrollado, probado y actualizado de manera independiente, lo que agiliza el proceso de desarrollo y permite una mejor organización del código.

## Tecnologías utilizadas

- **Angular**

## Estructura del proyecto

- **src/**: Contiene todo el código fuente del proyecto.
  - **app/**: Contiene la lógica principal de la aplicación.
    - **core/**: Contiene servicios, interceptores y guards que son singleton/globales en toda la aplicación.
    - **shared/**: Contiene componentes, pipes y directivas reutilizables en toda la aplicación.
    - **modules/**: Contiene módulos basados en características (feature-based), cada uno con sus propias páginas, componentes, servicios, modelos y rutas.
  - **assets/**: Contiene recursos estáticos como imágenes, estilos globales, etc.

```bash
src/
│
├── app/
│   ├── core/                     # singleton/global
│   │   ├── services/
│   │   │   └── api.service.ts
│   │   ├── interceptors/
│   │   └── guards/
│   │
│   ├── shared/                   # reutilizable (UI genérico)
│   │   ├── components/
│   │   │   ├── button/
│   │   │   └── modal/
│   │   ├── pipes/
│   │   └── directives/
│   │
│   ├── modules/                  # feature-based (clave)
│   │   ├── event-management/
│   │   │   ├── pages/
│   │   │   │   ├── create-event/
│   │   │   │   │   ├── create-event.component.ts
│   │   │   │   │   ├── create-event.html
│   │   │   │   │   └── create-event.scss
│   │   │   │   │
│   │   │   │   └── event-detail/
│   │   │   │
│   │   │   ├── components/
│   │   │   │   └── event-card/
│   │   │   │
│   │   │   ├── services/
│   │   │   │   └── event.service.ts
│   │   │   │
│   │   │   ├── models/
│   │   │   │   └── event.model.ts
│   │   │   │
│   │   │   └── routes.ts
│   │   │
│   │   ├── venue-management/
│   │   ├── service-marketplace/
│   │   ├── order-management/
│   │   └── ticketing/
│   │
│   ├── app.routes.ts
│   └── app.config.ts
│
└── assets/
```
