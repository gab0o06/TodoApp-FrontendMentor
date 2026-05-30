# 📝 Fully-Feature Todo App - React, TypeScript & Vite

Una aplicación avanzada de gestión de tareas (*Todo Management*) que expande las capacidades clásicas CRUD. Incorpora un sistema dinámico de filtrado, alternancia global de temas visuales (Dark/Light Mode), detección reactiva de viewports mediante JavaScript y un módulo interactivo de reordenamiento mediante la API nativa de arrastrar y soltar (*Drag and Drop*).

🎯 **Demo en Vivo:** [Visita la aplicación desplegada](https://fabulous-biscuit-872b3a.netlify.app/)

---

## 🛠️ Stack Tecnológico

* **Core:** React 18 (Vite + SWC Compiler)
* **Tipado:** TypeScript 5
* **Gestión de Layout:** CSS3 Avanzado (Flexbox & Variables de Temas)
* **Web APIs Nativas:** Drag and Drop API & Window MatchMedia API

---

## 🚀 Características Clave y Desafíos Técnicos

* **Estrategia Adaptativa por Código (matchMedia):** Uso de la API nativa `matchMedia` en lugar de depender únicamente de CSS para pre-calcular el tipo de pantalla (*Phone View*) y renderizar de manera óptima las imágenes de fondo adecuadas.
* **Control de Renderizado Eficiente:** Implementación de `useRef` como un acumulador de ID persistente (`id.current`), previniendo ciclos de renderizado innecesarios comunes al usar variables de estado tradicionales.
* **Flujos de Filtrado Condicional:** Mapeo y filtrado en caliente del estado del cliente para segmentar tareas en tiempo real bajo tres contextos: Global (*All*), Pendientes (*Active*) y Finalizadas (*Completed*).
* **Interacciones Nativas de Arrastre (Drag & Drop):** Integración de eventos de transferencia de datos (`DataTransfer`) para habilitar capacidades de reordenamiento de listas de forma ligera y sin dependencias externas.

---

## 📐 Criterio de Ingeniería y Estructura

### Adaptabilidad Dinámica del Viewport y Estado
Para optimizar la carga de recursos multimedia (imágenes de fondo móviles vs. escritorio), se evalúa el contexto del navegador inmediatamente al montar el componente principal con un único disparo de `useEffect`:

```typescript
useEffect(() => {
  const mql = matchMedia("(max-width: 480px)");
  mql.matches && setIsPhoneView(!isPhoneView);
}, []);
```
### Gestión de Identificadores Mutables No-Reactivos
Para el incremento del ID de cada tarea, se evitó el sobrecosto de ejecución de un useState utilizando useRef. Esto garantiza mutaciones atómicas instantáneas al presionar la tecla Enter:
```typescript
const createTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
  let input = e.target as HTMLInputElement;
  if (e.key === "Enter") {
    if (!input.value) return alert("Please enter a task...");
    
    setTasksList([
      ...tasksList,
      { id: id.current.toString(), task: input.value, completed: false },
    ]);

    id.current += 1; // Mutación directa sin re-renderizar
    input.value = "";
  }
};
```
---
## 🔧 Instalación y Configuración

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/gab0o06/TodoApp-FrontendMentor.git](https://github.com/gab0o06/TodoApp-FrontendMentor.git)
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```
4. Iniciar servidor
   ```bash
   npm run dev
   ```
