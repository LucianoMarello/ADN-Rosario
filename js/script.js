// Definimos los productos disponibles
const productos = [
    {
        id: 1,
        nombre: "Arroz",
        precio: 220,
        cantidad: 0
    },
    {
        id: 2,
        nombre: "Fideos",
        precio: 350,
        cantidad: 0
    },
    {
        id: 3,
        nombre: "Granola",
        precio: 500,
        cantidad: 0
    },
    {
        id: 4,
        nombre: "Mani",
        precio: 160,
        cantidad: 0
    }
];

// Creamos el carrito vacío
const carrito = [];

// Crea una lista de los productos
function enlistarProductos() {
    let mensaje = "PRODUCTOS DISPONIBLES: \n"
    for (const producto of productos) {
        mensaje += "ID: " + producto.id + " - Producto: " + producto.nombre + " - Precio: " + producto.precio + "$ x kg \n";
    }
    return mensaje;
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    let mensaje = "PRODUCTOS EN EL CARRITO: ";
    if (carrito.length != 0) {
        for (const producto of carrito) {
            mensaje += "\n -" + producto.nombre + "  x " + producto.cantidad + " kilo/s = "+ (producto.precio*producto.cantidad)+"$";
        }
        alert(mensaje);
    } else {
        alert("El carrito esta vacío");
    }
}

// Función para calcular el total de la compra
function calcularTotal() {
    let total = 0;
    for (const producto of carrito) {
        total += (producto.precio*producto.cantidad);
    }
    return total;
}

// Pregunta que productos quiere comprar el usuario
let seguirComprando = true;
let lista = enlistarProductos();
while (seguirComprando) {
    let idProducto = parseInt(prompt(lista + "\nIngrese el ID del producto que desea agregar al carrito (0 para finalizar):"));
    if (idProducto === 0) {
        seguirComprando = false;
    } else {
        const productoEncontrado = productos.find(producto => producto.id === idProducto);
        // Si el ID ingresado coincide con algún producto, se pregunta la cantidad a comprar y luego se agrega al carrito
        if (productoEncontrado) {
            let cantidad = parseInt(prompt("Cuantos kilos de " + productoEncontrado.nombre + " quiere comprar?"));
            if (isNaN(cantidad)) {
                alert("Error, ingrese un número.");
            } else if(cantidad!=0){
                // Agrega el producto al carrito
                let encontrado = false;
                for (i = 0; i < carrito.length; i++) {
                    // Verifica si el producto ya está incluido en el carrito
                    if (carrito[i].id === productoEncontrado.id) {
                        encontrado = true;
                        break;
                    }
                }
                if (encontrado) {
                    // Si el producto ya está en el carrito, se le suma la cantidad de kilos deseada
                    alert("Habia " + carrito[i].cantidad + " kilo/s de " + productoEncontrado.nombre + " y ahora se agregaron " + cantidad + " kilo/s");
                    carrito[i].cantidad = carrito[i].cantidad + cantidad;
                    mostrarCarrito();
                } else { // Si no, se agrega el producto al carrito
                    alert("Se agregaron " + cantidad + " kilo/s de " + productoEncontrado.nombre);
                    productoEncontrado.cantidad = cantidad;
                    carrito.push(productoEncontrado);
                    mostrarCarrito();
                }
            }
        } else {
            // Si el ID no coincide con ningún producto, se informa al usuario y vuelva al principio del while
            alert("No se encontró ningún producto con el ID ingresado.");
        }
    }
}

// Mostramos los productos del carrito al finalizar
mostrarCarrito();

// Verificamos si hay algún producto en el carrito y llamamos a la función para calcular el total si hace falta
if(carrito.length!=0){
    let total = calcularTotal();
    let control = true
    do{
        let confirmar = prompt("El total de la compra es de "+total+"$ \n\nPara confirmar su compra escriba CONFIRMAR \nPara cancelarla escriba CANCELAR");
        //Pedimos confirmación de la compra
        if(confirmar.toUpperCase()==="CONFIRMAR"){
            alert("Su pedido ha sido confirmardo. Muchas gracias por su compra!");
            control=false;
        }else if(confirmar.toUpperCase()==="CANCELAR"){
            alert("Su compra ha sido cancelada.");
            control=false;
        }else{
            alert("Por favor, escriba CONFIRMAR o CANCELAR");
        }
    }while(control)
}
