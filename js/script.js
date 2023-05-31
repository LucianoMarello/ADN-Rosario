//Recuperamos el carrito del localStorage si existe, o lo creamos vacío
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Obtenemos los elementos del DOM
const cardConteiner = document.getElementById("destacados");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const botonConfirmar = document.getElementById("boton-confirmar");
const botonVaciarCarrito = document.getElementById("vaciar-carrito");

//Buscador
/* const buscador = document.querySelectorAll(".buscador");
const seccionesProductos = document.querySelectorAll(".seccionesBuscadas");
buscador.addEventListener("input", () => {
    const searchTerm = buscador.value.toLowerCase();
    //Event listener para redirigir al hacer click en el enlace de la seccion
    for (let i = 0; i < seccionesProductos.length; i++){
        seccionesProductos[i].addEventListener("click", (event) => {
            event.preventDefault(); //Evitar el comportamiento predeterminado del enlace
            const href = this.getAttribute("href");
            window.location.href = href; //Redirecciona a la ubicación de la sección
        })
    }
}) */


//Menu Carrito
const carritoToggle = document.querySelector(".carrito-toggle");
const carritoContenido = document.querySelector(".carrito");

//Abrir o cerrar carrito a partir del botón carrito
carritoToggle.addEventListener("click", () => {
    carritoContenido.classList.toggle("show");
    carritoToggle.classList.toggle("active")
});

// Cerrar el menú desplegable al hacer clic fuera de él
document.addEventListener("click", (event) => {
    const targetElement = event.target;
    if (!carritoContenido.contains(targetElement) && !carritoToggle.contains(targetElement)) {
        carritoContenido.classList.remove("show");
        carritoToggle.classList.remove("active");
    }
});

//Fetch para obtener los datos del JSON local
fetch("./js/data.json")
    .then(response => response.json())
    .then(data => {
        const productos = data;

        //Crea las cards de los productos
        productos.forEach(element => {
            let card =
                `<div class="col-lg-3 col-6">
                    <div class="card" style="width: auto;">
                        <img src="${element.img}" class="card-img-top" alt="${element.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${element.nombre}</h5>
                            <p class="card-text">$ ${element.precio} x 1kg</p>
                            <div class="input-group mb-3">
                                <button type="button" class="boton-restar btn btn-outline-secondary" data-id="${element.id}"> - </button>
                                <input class="cant form-control text-center" type="number" data-id="${element.id}" min="1" max="10" value="1">
                                <button type="button" class="boton-sumar btn btn-outline-secondary" data-id="${element.id}"> + </button>
                            </div>
                            <a class="btn btn-primary boton-agregar" data-id="${element.id}">Añadir al carrito</a>
                        </div>
                    </div>
                </div>`
            cardConteiner.innerHTML += card;
        })

        //Obtenemos los elementos del DOM
        const botonAgregar = document.querySelectorAll(".boton-agregar");
        const cantProductos = document.querySelectorAll(".cant");
        const botonSumar = document.querySelectorAll(".boton-sumar");
        const botonRestar = document.querySelectorAll(".boton-restar");


        //Función para mostrar el contenido del carrito
        function mostrarCarrito() {
            let htmlCarrito = "";
            for (const producto of carrito) {
                htmlCarrito += `<li>
                ${producto.nombre} x ${producto.cantidad} kg = $${producto.precio * producto.cantidad}
                <button type="button" class="btn-close" aria-label="Close" data-id="${producto.id}"></button>
                </li>`;
            }
            listaCarrito.innerHTML = htmlCarrito;
            totalCarrito.textContent = calcularTotal();
            const botonCerrar = document.querySelectorAll(".btn-close");
            botonCerrar.forEach(boton => {
                boton.addEventListener("click", eliminarProducto);
            });
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
                    Toastify({
                        text: `Se agregaron ${productoEncontrado.cantidad}kg de ${productoEncontrado.nombre}`,
                        duration: 3000,
                        close: true,
                    })
                } else if (cantProductos[id - 1].value != 0) {
                    carrito.push(productoEncontrado);
                    Toastify({
                        text: `Se agregaron ${productoEncontrado.cantidad}kg de ${productoEncontrado.nombre} al carrito`,
                        duration: 3000,
                        destination: "https://github.com/apvarun/toastify-js",
                        newWindow: true,
                        close: true,
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        onClick: function () { } // Callback after click
                    }).showToast();
                }
            }
            mostrarCarrito();
            guardarCarrito();
        }

        //Función para eliminar productos del carrito
        function eliminarProducto(event) {
            const id = parseInt(event.target.dataset.id);
            carrito.forEach((producto, index) => {
                if (producto.id === id) {
                    carrito.splice(index, 1);
                }
            });
            guardarCarrito();
            mostrarCarrito();
        }

        // Función para guardar el carrito de compra en LocalStorage
        function guardarCarrito() {
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }

        //Función para confirmar la compra
        function confirmarCompra() {
            if (carrito.length != 0) {
                Swal.fire({
                    title: "Compra Realizada",
                    text: "Total de compra: $" + calcularTotal(),
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

        //Función para abrir menu carrito
        function abrirCarrito() {
            carritoContenido.classList.toggle("show");
            carritoToggle.classList.toggle("active");
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

        // Agregar event listeners a los botones de suma
        botonSumar.forEach(boton => {
            boton.addEventListener("click", () => {
                const id = parseInt(boton.dataset.id);
                const inputCantidad = document.querySelector(`.cant[data-id="${id}"]`);
                const valorActual = parseInt(inputCantidad.value);
                const valorMaximo = parseInt(inputCantidad.max);
                if (valorActual < valorMaximo) {
                    inputCantidad.value = valorActual + 1;
                }
            });
        });

        // Agregar event listeners a los botones de resta
        botonRestar.forEach(boton => {
            boton.addEventListener("click", () => {
                const id = parseInt(boton.dataset.id);
                const inputCantidad = document.querySelector(`.cant[data-id="${id}"]`);
                const valorActual = parseInt(inputCantidad.value);
                const valorMinimo = parseInt(inputCantidad.min);
                if (valorActual > valorMinimo) {
                    inputCantidad.value = valorActual - 1;
                }
            });
        });
    })