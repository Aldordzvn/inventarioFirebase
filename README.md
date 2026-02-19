# InventarioFirebase

Este proyecto es una aplicación de inventario de productos desarrollada con Angular v19, enfocada en aplicar buenas prácticas de arquitectura frontend y manejo de estado, utilizando un enfoque mobile first y una base de código clara y escalable.

La aplicación permite crear, visualizar, editar y eliminar productos, manteniendo un control básico de inventario. El formulario de gestión está construido con Reactive Forms, lo que permite validaciones robustas, control preciso del estado de los campos y una mejor experiencia de usuario.

Para la gestión de datos se utiliza Firebase Realtime Database consumida mediante su REST API, sin depender del SDK de Firebase. La comunicación con la API se maneja a través de Api Services desacoplados y una capa de Facade Services, lo que permite separar la lógica de negocio de los componentes y mantener un flujo de datos más predecible.

El manejo asincrono y la transformación de datos se realiza con RxJS, aprovechando observables para gestionar peticiones HTTP, estados de edición y sincronización de datos entre vistas y servicios.


---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
