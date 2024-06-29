const listadoDeTareas = document.querySelector('#listadoDeTareas');
const tareaInput = document.querySelector('#nuevaTarea');
const agregarTarea = document.querySelector('#agregarTarea');
const total = document.querySelector("#total");
const realizadas = document.querySelector("#realizadas");

// Inicializar lista de tareas 
let listaTarea = [
    { id: 1, tarea: 'tarea1', realizada: false },
    { id: 2, tarea: 'tarea2', realizada: false },
    { id: 3, tarea: 'tarea3', realizada: false }
];

// Obtener el siguiente ID disponible 
function obtenerSiguienteId() {
    let maxId = 0;
    listaTarea.forEach(tarea => {
        if (tarea.id > maxId) {
            maxId = tarea.id;
        }
    });
    return maxId + 1;
}

// Actualizar contadores en el DOM
function actualizarContadores() {
    total.innerHTML = listaTarea.length;
    realizadas.innerHTML = listaTarea.filter(tarea => tarea.realizada).length;
}

// Renderizar la lista de tareas en el DOM
function renderTarea() {
    listadoDeTareas.innerHTML = ''; 
    listaTarea.forEach(listado => {
        const nuevaFila = document.createElement('tr');
        nuevaFila.id = `tarea-${listado.id}`; 
        nuevaFila.innerHTML = `
            <th scope="row">${listado.id}</th>
            <td>${listado.tarea}</td>
            <td><input type="checkbox" ${listado.realizada ? 'checked' : ''} onchange="marcarRealizada(${listado.id})"/></td>
            <td><button type="button" class="btn btn-danger" onclick="eliminarTarea(${listado.id})">X</button></td>
        `;
        listadoDeTareas.appendChild(nuevaFila);
    });
}

// Agregar una nueva tarea
agregarTarea.addEventListener('click', (event) => {
    event.preventDefault(); 

    const tarea = tareaInput.value.trim();
    if (tarea) {
        const nuevaTarea = { 
            id: obtenerSiguienteId(), 
            tarea: tarea, 
            realizada: false 
        };
        listaTarea.push(nuevaTarea);
        tareaInput.value = '';
        actualizarContadores();
        renderTarea();
    }
});
// Eliminar una tarea
function eliminarTarea(id) {
    listaTarea = listaTarea.filter(tarea => tarea.id !== id);
    actualizarContadores();
    renderTarea();
}

// Marcar una tarea como realizada o no realizada
function marcarRealizada(id) {
    const tarea = listaTarea.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.realizada = !tarea.realizada;
        actualizarContadores();

        // Actualizar el checkbox en el DOM
        const checkbox = document.querySelector(`#tarea-${id} input[type="checkbox"]`);
        checkbox.checked = tarea.realizada; 
    }
}

// Inicializar la aplicación
actualizarContadores();
renderTarea();