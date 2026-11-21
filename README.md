# 🛒 DemoVitestCarrito — Demo de Vitest en Angular 22

Este proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) versión **22.3.0** y creado para la charla **"Vitest en Angular: Pruebas rápidas, código confiable"** en el **Meetup de Angular Bolivia (Sucre)**.

Muestra cómo escribir pruebas unitarias y de integración modernas, rápidas y con **100% de cobertura** en Angular 22 utilizando **Vitest**, **Signals** y **RxJS**.

---

## 🚀 Características de la Demo

* **Angular 22 + Standalone Components:** Arquitectura moderna sin `NgModules`.
* **Reactividad con Signals:** Gestión de estado del carrito mediante `signal()` y cálculos automáticos con `computed()`.
* **Vitest nativo:** Ejecución ultrarrápida sobre Node.js + JSDOM (~2 segundos).
* **Suite de Pruebas Completa (8 tests / 100% Coverage):**
  * **1. Lógica y Signals (`cart.spec.ts`):** Validación de cálculo de cantidades y subtotales reactivos (`signal` y `computed`).
  * **2. Interacción del Usuario / DOM (`cart.spec.ts`):** Simulación de clics en botones y verificación de cambios en la plantilla HTML (`fixture.detectChanges()`).
  * **3. Mocks y Manejo de Errores (`cart.spec.ts`):** Simulación de respuestas exitosas y errores del servidor usando `vi.spyOn()`, `of()` y `throwError()`.
  * **4. Pruebas Unitarias de Servicio (`coupon.service.spec.ts`):** Validación asíncrona de `Observables` con `firstValueFrom()` y `async/await`.

---

## 📂 Estructura del Proyecto

```text
src/app/cart/
├── cart.ts                  # Lógica del carrito con Signals (items, subtotal, total)
├── cart.html                # Plantilla HTML interactiva
├── cart.css                 # Estilos del componente
├── cart.spec.ts             # 6 pruebas (Signals, DOM y Mocks con vi.spyOn)
├── coupon.service.ts        # Servicio que simula la validación de cupones (ANGULAR20)
└── coupon.service.spec.ts   # 2 pruebas unitarias del servicio real con firstValueFrom
```

---

## 🛠️ Instalación y Configuración

### 1. Clonar e instalar dependencias del proyecto
```bash
git clone https://github.com/<TU_USUARIO>/demo-charla-vitest.git
cd demo-charla-vitest
npm install
```

### 2. Instalar dependencias para la interfaz visual y cobertura de Vitest
Angular 22 incluye [Vitest](https://vitest.dev/) por defecto al crear el proyecto, pero para habilitar el panel gráfico interactivo (`--ui`) y los reportes de cobertura (`--coverage`), instala estos dos paquetes de desarrollo:

```bash
npm install -D @vitest/ui @vitest/coverage-v8
```

---

## 💻 Servidor de Desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Una vez que el servidor esté corriendo, abre tu navegador y ve a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifiques alguno de los archivos fuente.

---

## 🧪 Ejecución de Pruebas Unitarias (Vitest)

### 1. Modo Watch en Terminal (Desarrollo continuo)
Ejecuta las pruebas unitarias con Vitest en modo interactivo, re-ejecutando automáticamente solo las pruebas afectadas cuando guardas cambios:
```bash
ng test
```

### 2. Interfaz Visual Interactiva (`--ui`)
Abre un panel gráfico en el navegador (`@vitest/ui`) donde puedes explorar el árbol de pruebas por categorías, inspeccionar los tiempos de ejecución en milisegundos y ver el código de cada test en tiempo real:
```bash
ng test --ui
```

### 3. Ejecución Única + Reporte de Cobertura (`--no-watch --coverage`)
Ejecuta toda la suite una sola vez (ideal para pipelines de integración continua **CI/CD**) y genera la tabla de cobertura de código usando el motor **V8**:
```bash
ng test --no-watch --coverage
```

#### 📊 Cómo interpretar el reporte de cobertura
Al ejecutar `--coverage`, Vitest muestra 4 métricas clave en consola:
* **`% Stmts` (Statements):** Porcentaje de sentencias o instrucciones ejecutadas.
* **`% Branch` (Branches):** Porcentaje de caminos lógicos recorridos (como bloques `if / else` u operadores ternarios `? :`).
* **`% Funcs` (Functions):** Porcentaje de métodos y funciones invocadas.
* **`% Lines` (Lines):** Porcentaje de líneas físicas de código ejecutadas.

En este repositorio todas las métricas alcanzan el **100% en verde**.

---

## 🏗️ Generación de Código (Scaffolding) y Compilación

### Generar nuevos elementos con Angular CLI
Para generar un nuevo componente, ejecuta:
```bash
ng generate component nombre-del-componente
```
Para ver la lista completa de esquemas disponibles (como `components`, `directives` o `pipes`), ejecuta `ng generate --help`.

### Compilar el proyecto para producción
Para compilar la aplicación, ejecuta:
```bash
ng build
```
Esto compilará el proyecto y guardará los archivos resultantes en el directorio `dist/`, optimizados por defecto para rendimiento y velocidad.

---

## 📚 Recursos Adicionales

Para más información sobre el uso de Angular CLI, incluidas referencias detalladas de comandos, visita la página oficial de [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
