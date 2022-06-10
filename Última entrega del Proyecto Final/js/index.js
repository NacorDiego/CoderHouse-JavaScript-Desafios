console.log("index.js");

//Mostrar productos en la sección catálogo
fetch('../json/bd.json')
.then(respuesta => respuesta.json())
.then(productos => {
    mostrarProductos(productos);
})

//Muestra cantidad de elementos en el carrito del storage.
cantidadCarrito();

//Escuchador de eventos de tipo "change" que retorna el elemento.
filtroMarca.addEventListener("change", (elemento) => {
    //Si el valor del elem al que se hizo targe es distinto de " (vacio) " ENTONCES(V) ejecuta función mostrar productos(con el array que retorna la función filtrar(productos, el valor del elemento al que se hizo target)) SINO(F) ejecuta la función mostrarProductos(productos). 
    // elemento.target.value != " " ? mostrarProductos(filtrar(productos, elemento.target.value)) : mostrarProductos(productos);
    fetch('../json/bd.json')
        .then(respuesta => respuesta.json())
        .then(productos => {
            if (elemento.target.value != " ") { 
                mostrarProductos(filtrar(productos, elemento.target.value));
            } else {
                mostrarProductos(productos);
            }
        })
});

//Escuchador de eventos de tipo "input" en #buscador.
buscador.addEventListener("input", (elemento) => {
    //Ejecuta la función "mostrarProductos" con lo retornado de la función buscar(productos,valor del elemento al que se hizo target).
    fetch('../json/bd.json')
        .then(respuesta => respuesta.json())
        .then(productos => {
            mostrarProductos(buscar(productos, elemento.target.value));
        })
});

//Controla todos los botones de contModelos mediante un escuchador de eventos click.
contModelos.addEventListener("click", elemento => {
    //Si en el boton que se le hizo target contiene una clase que se llama "agregar" entonces:
    if (elemento.target.classList.contains("agregar")) {
        //Guardo el id del botón targeteado en string.
        let idBoton = elemento.target.id;
        //Substraigo del string el numero en el ID y lo guardo en la variable.
        let numID = idBoton.replace(/[^0-9]/ig, "");
        //Paso el array productos y el NUMERO en el ID del botón, para buscar el objeto del array que tenga el mismo ID que el que paso.
        agregar(numID);
    }
})

//Controla el formulario mediante un escuchador de eventos submit.
formularioC.addEventListener('submit', (event) => {
    capturarForm(event);
})