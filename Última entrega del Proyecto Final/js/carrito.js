//DE ESTA MANERA SE PODRÍA CREAR UN BOTÓN PARA ELIMINAR UN ITEM DEL CARRITO (AGREGAR FUNCIONALIDAD EN PRÓXIMA ENTREGA). Minuto 1:36:00 del video Workshop I.
// document.querySelector(`#producto${i}`).remove();
//carrito.splice(i,1)

console.log('carrito.js')

// //Controla todos los botones de contModelos mediante un escuchador de eventos click.
// divCarrito.addEventListener("click", elemento => {
//     console.log('Ejecuto el evento click')
//     //Si en el boton que se le hizo target contiene una clase que se llama "agregar" entonces:
//     if (elemento.target.classList.contains("eliminar")) {
//         console.log('El boton tenía la clase eliminar');
//         //Guardo el id del botón targeteado en string.
//         let idBoton = elemento.target.id;
//         //Substraigo del string el numero en el ID y lo guardo en la variable.
//         let numID = idBoton.replace(/[^0-9]/ig, "");
//         //Paso el array productos y el NUMERO en el ID del botón, para buscar el objeto del array que tenga el mismo ID que el que paso.
//         eliminarDelCarrito(numID);
//     }
// })



mostrarProductosCarrito();
cantidadCarrito();
mostrarTotalCarrito();
eliminarDelCarrito();