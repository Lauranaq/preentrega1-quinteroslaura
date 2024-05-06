const carrito = [];
//Arrays con productos=prestamos
const productos = [
    {
        nombre: "Prestamo para compra o reparacion de Vehiculos",
        monto: 700000,
        img: "./img/auto.jpg",
        cantidad: 1,
    },
    {
        nombre: "Prestamo para Electrodomesticos",
        monto: 300000,
        img:"./img/electrodomesticos.jpg", 
        cantidad: 1,

    },
    {
        nombre: "Prestamo para reformas en el Hogar",
        monto: 400000,
        img:"./img/hogar.jpg", 
        cantidad: 1,
    },    
    {
        nombre: "Prestamo para Vacaciones o Viajes",
        monto: 200000,
        img: "./img/vacaciones.jpg",
        cantidad: 1,
    },
    {
        nombre: "Prestamo para Refinanciacion de Pasivos",
        monto: 150000,
        img: "./img/pasivos2.jpg",
        cantidad: 1,
    },
    {
        nombre: "Prestamo para otros Motivos",
        monto: 50000,
        img: "./img/otros.jpg",
        cantidad: 1,
    },
             
];
//Arrays de cuotas 
const cuotas = [1, 2,3,4,5,6];

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");


// Recorro Array de Cuotas 
const container = document.getElementById('containerCuotas');
const selectElement = document.createElement('select');
selectElement.setAttribute('id', 'selectCuotas');
cuotas.forEach(cuota => {
    const option = document.createElement('option'); 
    option.value = cuota 
    option.text = cuota;  
    selectElement.appendChild(option);
});
container.appendChild(selectElement);

//Funcion para calcular el valor de la cuota 
function calcularCuota(montoTotal, cuotaElegida) {
    let interesInicial = 0.05; // 5%
    let incrementoInteres = 0.02; // 2%
    let interesTotal = interesInicial + (cuotaElegida - 1) * incrementoInteres;
    let cuotaConInteres = montoTotal * (1 + interesTotal) / cuotaElegida;
    return cuotaConInteres.toFixed(2);
}

// Función para mostrar las cuotas
const mostrarCuotas = () => {
    const cuotaSeleccionada = parseInt(document.getElementById('selectCuotas').value);
    const montoTotal = parseInt(carritoTotal.innerText.slice(1));
    const cuotaCalculada = calcularCuota(montoTotal, cuotaSeleccionada);
    document.getElementById('cuotaSeleccionada').innerText = `El valor de cada cuota seria: $${cuotaCalculada}`;
};

// Evento para detectar cambios en la selección de cuotas
document.getElementById('selectCuotas').addEventListener('change', mostrarCuotas);


//Funcion para actualizar el carrito con prestamos seleccionados
function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");

        carritoProductos.innerHTML = "";
        carrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${producto.nombre}</h3>                
                <p>Subt: $${producto.monto}</p>
            `;

            const btn = document.createElement("button");
            btn.classList.add("carrito-producto-btn");
            btn.innerText = "✖️";
            btn.addEventListener("click", () => {
                borrarDelCarrito(producto);
            })
            div.append(btn);

            carritoProductos.append(div);
        })
    }
    actualizarTotal();
}


//Funcion para agregar el prestamo seleccionado
const agregarAlCarrito = (producto) => {
    if (producto.cantidad > 0){ 
        const itemEncontrado = carrito.find(item => item.nombre === producto.nombre);
        if (itemEncontrado) {
            itemEncontrado.cantidad++;
            producto.cantidad--;
        } else {
            carrito.push({...producto, cantidad: 1});
            producto.cantidad--;
        }
    }else {
        Swal.fire({
            title: "Lo sentimos!",
            text: "El prestamo solo puede elegirse una vez",
            icon: "error"
          });

             
    } 
        actualizarCarrito();
        mostrarCuotas();
}

//Funcion para borrar algun prestamo seleccionado
const borrarDelCarrito = (producto) => {
    const prodIndex = carrito.findIndex(item => item.nombre === producto.nombre);
    carrito.splice(prodIndex, 1);
    actualizarCarrito();
    mostrarCuotas();
}

//Funcion para actualizar el monto total del prestamo
const actualizarTotal = () => {
    const total = carrito.reduce((acc, prod) => acc + prod.monto , 0);    
    carritoTotal.innerText = `$${total}`;
}


// Recorro el array de prestamos 
productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="producto-img" src="${producto.img}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.monto}</p>
    `;

    const btn = document.createElement("button");
    btn.classList.add("producto-btn");
    btn.innerText = "Solicitar Prestamo";

    btn.addEventListener("click", () => {
        agregarAlCarrito(producto);
    })

    div.append(btn);
    contenedorProductos.append(div);
})




//Local Storage Modo Color 
const body = document.body;

let modoColorLS = localStorage.getItem ("modo-color");
if (modoColorLS === ("modo-oscuro")){
    body.classList.add("modo-oscuro")
}

const btnModoColor = document.querySelector("#modo-color");
 
btnModoColor.addEventListener("click", () => {
    body.classList.toggle("modo-oscuro");
    if (body.classList.contains("modo-oscuro")){
        localStorage.setItem("modo-color", "modo-oscuro");
    }else{
        localStorage.removeItem ("modo-color");
    }
}) 
