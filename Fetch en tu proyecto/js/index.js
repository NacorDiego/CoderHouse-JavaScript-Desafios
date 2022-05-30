console.log("index.js");

//Muestra los productos en la pantalla.
mostrarProductos(productos);
//Muestra cantidad de elementos en el carrito del storage.
cantidadCarrito();

//Escuchador de eventos de tipo "change" que retorna el elemento.
filtroMarca.addEventListener("change", (elemento) => {
    //Si el valor del elem al que se hizo targe es distinto de " (vacio) " ENTONCES(V) ejecuta función mostrar productos(con el array que retorna la función filtrar(productos, el valor del elemento al que se hizo target)) SINO(F) ejecuta la función mostrarProductos(productos). 
    elemento.target.value != " " ? mostrarProductos(filtrar(productos, elemento.target.value)) : mostrarProductos(productos);
});

//Escuchador de eventos de tipo "input" en #buscador.
buscador.addEventListener("input", (elemento) => {
    //Ejecuta la función "mostrarProductos" con lo retornado de la función buscar(productos,valor del elemento al que se hizo target).
    mostrarProductos(buscar(productos, elemento.target.value));
});

contModelos.addEventListener("click", elemento => {
    //Si en el elemento que se le hizo target contiene una clase que se llama "agregar" entonces:
    if (elemento.target.classList.contains("agregar")) {
        //Ejecuta la función agregar y se le pasa el id del elemento al que se le hizo target.
        agregar(elemento.target.id);
        //Se llama a la función cantidad carrito para que actualice la cantidad de elementos en el carrito.
        cantidadCarrito();
    }
})

