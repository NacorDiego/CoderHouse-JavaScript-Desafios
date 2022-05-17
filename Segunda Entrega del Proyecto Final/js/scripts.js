class Producto {
    constructor(marca,modelo,precio,stock,sexo){
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.stock = stock;
        this.sexo = sexo;
    }
}

const producto1 = new Producto('Nike','Court Borough ',8500,10,'masculino');
const producto2 = new Producto('Nike','Air Max',17000,5,'masculino');
const producto3 = new Producto('Nike','Revolution 6',15000,7,'femenino');
const producto4 = new Producto('Adidas','Grand Court',10000,9,'masculino');
const producto5 = new Producto('Adidas','Galaxy 5',12000,7,'femenino');
const producto6 = new Producto('Adidas','Coreracer',10500,10,'masculino');
const producto7 = new Producto('Puma','X-Ray 2',16000,5,'masculino');
const producto8 = new Producto('Puma','Caven',12000,10,'masculino');
const producto9 = new Producto('Puma','Disperse XT',13000,8,'femenino');

let productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9];

//Creo el array donde se van a guardar los productos en el carrito
let carrito = [];


//Consulto en mi localStorage si existe mi item carrito. Si el carrito no existe me va a devolver null.
//Se crea en esta instancia porque más adelante voy a consultar el carrito.
if(localStorage.getItem('carrito')){ //Si no existe, esto da null.
    //Si existe el carrito en localStorage, entonces mi carrito va a ser igual que el carrito que está en localStorage. Si tengo productos ahi adentro los voy a recuperar. Como el carrito del storage va a estar en formato json lo voy a tener que convertir con la funcion JSON.parse.
    carrito = JSON.parse(localStorage.getItem('carrito'));
} else {
    //Si el carrito no existe, lo creo y convierto el objeto a JSON con el stringify.
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

let contModelos = document.querySelector('#contModelos');

productos.forEach((producto, i) => {
    contModelos.innerHTML += `
        <div id="producto${i}" class="card modelos__producto col-12 col-md-3 mx-3">
            <img src="./img/zapatilla${i}.webp" class="card-img-top" alt="Imagen de zapatilla ${i}">
            <div class="card-body">
                <h5 class="card-title">${producto.marca} ${producto.modelo}</h5>
                <p class="card-text">$${producto.precio}</p>
                <p class="card-text">${producto.stock} unidades</p>
                <button id="botonProducto${i}" class="btn btn-danger modelos__producto__boton">Agregar al carrito</button>
            </div>
        </div>
    `
})


//Consulto cada botón de cada producto y le agrego un evento escuchador de tipo 'click'. Cuando se clickea un botón retorna el objeto producto correspondiente a ese botón.
productos.forEach((producto,i) => {
    document.querySelector(`#botonProducto${i}`).addEventListener('click', () => {
        //DE ESTA MANERA SE PODRÍA CREAR UN BOTÓN PARA ELIMINAR UN ITEM DEL CARRITO (PRACTICAR). Minuto 1:36:00 del video Workshop I.
        // document.querySelector(`#producto${i}`).remove();
        //carrito.splice(i,1)

        //Guardo el producto del array productos en la posición i en 'productoCarrito'.
        let productoCarrito = productos[i];
        //Guardo, mediante push en el array carrito, el producto que guarde anteriormente.
        carrito.push(productoCarrito);
        //Piso cada uno de los productos en el localStorage. Como lo consulte anteriormente, tengo los datos del localStorage en el carrito.
        localStorage.setItem('carrito', JSON.stringify(carrito));
    });
})






