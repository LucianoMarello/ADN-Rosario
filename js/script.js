// Definimos los productos disponibles
const productos = [
    {
        id: 1,
        nombre: "Azucar Ledesma",
        precio: 350,
        cantidad: 0
    },
    {
        id: 2,
        nombre: "Dulce de leche",
        precio: 500,
        cantidad: 0
    },
    {
        id: 3,
        nombre: "Leche en polvo",
        precio: 400,
        cantidad: 0
    },
    {
        id: 4,
        nombre: "Yerba Antiácida",
        precio: 1000,
        cantidad: 0
    }
];

// Recuperamos el carrito del localStorage si existe, o lo creamos vacío
const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
const carrito = carritoGuardado ? carritoGuardado : [];

//Obtenemos los elementos del DOM
const botonAgregar = document.querySelectorAll(".boton-agregar");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const botonConfirmar = document.getElementById("boton-confirmar");
const botonVaciarCarrito = document.getElementById("vaciar-carrito");
const cantProductos = document.querySelectorAll(".cant");

//Función para mostrar el contenido del carrito
function mostrarCarrito() {
    let htmlCarrito = "";
    for (const producto of carrito) {
        htmlCarrito += `<li>${producto.nombre} x ${producto.cantidad} kg = $${producto.precio * producto.cantidad}</li>
    `;
    }
    listaCarrito.innerHTML = htmlCarrito;
    totalCarrito.textContent = calcularTotal();
}

// Función para calcular el total de la compra
function calcularTotal() {
    let total = 0;
    for (const producto of carrito) {
        total += (producto.precio * producto.cantidad);
    }
    return total;
}

//Función para agregar productos al carrito o aumentar la cantidad que se quiere comprar
function agregarAlCarrito(evento) {
    const boton = evento.target;
    const id = parseInt(boton.dataset.id);
    const productoEncontrado = productos.find(producto => producto.id === id);
    if (productoEncontrado) {
        productoEncontrado.cantidad = cantProductos[id - 1].value;
        const productoEnCarrito = carrito.find(producto => producto.id === id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad = productoEncontrado.cantidad;
        } else if (cantProductos[id - 1].value != 0) {
            carrito.push(productoEncontrado);
        }
    }
    mostrarCarrito();
    guardarCarrito();
}

// Función para guardar el carrito de compra en LocalStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Función para comfirmar la compra
function confirmarCompra() {
    if(carrito.length!=0){
        Swal.fire({
            title: "Compra Realizada",
            text: "Total de compra: $"+calcularTotal(),
            icon: "success",
            confirmButtonText: "Continuar"
        })
    }
    carrito.length = 0;
    //Borramos el carrito de localStorage
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

//Función para vaciar el carrito
function vaciarCarrito() {
    carrito.length = 0;
    // Borramos el carrito de localStorage
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

botonAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
});
botonConfirmar.addEventListener("click", confirmarCompra);
botonVaciarCarrito.addEventListener('click', vaciarCarrito);

//Mostrar el carrito cuando se recargue la página
window.addEventListener("load", () => {
    mostrarCarrito();
});