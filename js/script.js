let producto
let total = 0
let condicion = prompt('Hola, quiere realizar una compra? Si o No');

while (condicion != 'No') {
    if (condicion == 'Si') {
        producto = prompt('Productos disponibles:\nArroz a 220$ x 1kg \nFideos a 500$ x 1kg \nGranola a 350$ x 1kg \nMani a 80$ x 1kg \n\n Ingrese la inicial del producto que quiere comprar (A, F, G o M).');
        if (producto == 'A'||producto == 'F'||producto == 'G'||producto == 'M') {
            total=sumar(total, producto)
            alert('El total de su compra por el momento es de ' + total + '$')
            condicion = prompt('Quiere seguir comprando? Si o No')
        } else { alert('Codigo no valido. Escriba A, F, G o M') }
    }
    else {
        condicion = prompt('Error. Escriba Si o No')
    }
}

alert('El total a pagar es de '+ total +'$\n\nGracias por su compra.')


function sumar(total, producto) {
    let precio = 0
    let cantidad = parseInt(prompt('Cuanto kg quiere comprar?'))
    switch (producto) {
        case 'A':
            precio = 220
            break;
        case 'F':
            precio = 500
            break;
        case 'G':
            precio = 350
            break;
        case 'M':
            precio = 80
            break;
    }
    total = total + (precio * cantidad)
    return(total);
}