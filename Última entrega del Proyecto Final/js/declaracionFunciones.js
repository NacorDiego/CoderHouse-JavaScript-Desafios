console.log("declaracionFunciones.js")

//Capturo los elementos del DOM que se usaran de manera global.
let contModelos = document.querySelector('#contModelos');
let cantCarrito = document.querySelector('#cantCarrito');
let contenedorTabla = document.querySelector('#tablaCarrito');
let filtroMarca = document.querySelector('#filtrar');
let buscador = document.querySelector("#buscador");
let formularioC = document.querySelector('#formularioContacto');

//Muestra los productos de las bd.json en el html en formato de cards.
fetch('../json/bd.json')
.then(respuesta => respuesta.json())
.then(productos => {
    productos.forEach(producto => {
        let {id,marca,modelo,precio,stock} = producto;
        contModelos.innerHTML += `
        <div id="producto${id}" class="card modelos__producto col-12 col-md-3 my-5">
            <img src="./img/zapatilla${id}.webp" class="modelos__producto__img mt-5 card-img-top" alt="Imagen de zapatilla ${id}">
            <div class="card-body">
                <p class="modelos__producto__precio mt-5 card-text">$${precio}</p>
                <h5 class="card-title">${marca} ${modelo}</h5>
                <p class="card-text">${stock} unidades</p>
                <button id="botonProducto${id}" class="agregar btn btn-danger modelos__producto__boton">Agregar al carrito</button>
            </div>
        </div>
    `
    })
})

//Muestra los elementos del carrito en una tabla en la sección elegida.
function mostrarCarrito() {
    let carrito = capturarStorage();
    //Vacio la sección.
    contenedorTabla.innerHTML = "";
    carrito.forEach(producto => {
        let { marca, modelo, precio, cantEnCarrito } = producto;
        contenedorTabla.innerHTML += `.
        <tr>
        <th scope="row">${cantEnCarrito}</th>
        <td>${marca}</td>
        <td>${modelo}</td>
        <td>$${precio}</td>
        <td><button class="btn btn-danger">x</button></td>
        </tr>       
        `
    });
}

//Coloca el numero de elementos dentro del carrito, en el nav.
function cantidadCarrito() {
    //Coloca la cantidad inicial de items en el carrito del localStorage al momento de iniciar la página.
    let carrito = capturarStorage();
    let cantProdEnCarrito = 0;
    carrito.forEach(producto => {
        cantProdEnCarrito = cantProdEnCarrito + producto.cantEnCarrito;
    })
    cantCarrito.innerHTML = `
        <i class="fa-solid fa-cart-shopping"></i>
        <span>${cantProdEnCarrito}</span>
    `
}

//Retorna el localStorage en formato objetos o retorna array vacio.
function capturarStorage() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

//Setea los elementos del array en el localStorage.
function guardarStorage(array) {
    localStorage.setItem("carrito", JSON.stringify(array));
}

//Agrega elementos en el carrito, sea que agrega el objeto o solo le aumenta la cantidad de veces que ese objeto está en el carrito.
function agregar(idParam) {
    //entro a agregar
    let carrito = capturarStorage();

    fetch('../json/bd.json')
    .then(respuesta => respuesta.json())
    .then(productos => {
        //Busca en el array el producto que coincide con el idParam.
        let productoEncontrado = productos.find(e => e.id == idParam);
        //Creo alerta con TOASTIFY cuando se agrega un producto al carrito.
        Toastify({
            text: `¡${productoEncontrado.marca} ${productoEncontrado.modelo} agregadas al carrito!`,
            duration: 3000,
            destination: "./pages/carrito.html",
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#28B463",
            },
            onClick: function () { } // Callback after click
        }).showToast();
    
        //Controla si el artículo está ya en el carrito o no mediante condicional.
        if (isInCart(idParam)) {
            incrementarCantidad(idParam);
        } else {
            //Devuelve el objeto del array que cumple con la condición, en este caso que el id coincida, y luego lo guarda en la var.
            productoEncontrado.cantEnCarrito = 1;
            carrito.push(productoEncontrado);
            guardarStorage(carrito);
        }
        
        //Llamo acá a esta función debido a que la promesa Fetch es asincrónica, y necesito que se ejecute luego de que resuelva la promesa.
        cantidadCarrito();
    })
}

//Incrementa la cantidad en la variable cantEnCarrito del objeto correspondiente al id.
function incrementarCantidad(id) {
    let carrito = capturarStorage();
    //Devuelve el indice de la posición donde se encuentra el producto con el id dentro del array carrito.
    const indice = carrito.findIndex(e => e.id == id);
    carrito[indice].cantEnCarrito++;
    guardarStorage(carrito);
}

function isInCart(id) {
    let carrito = capturarStorage();
    //Devuelve true o false si se cumple la condición. En este caso si hay un objeto con el id igual al id que le paso como param.
    return carrito.some(e => e.id == id);
}

//Filtra elementos del array que coincidan con la condición dato.
function filtrar(array, dato) {
    //Retorna un nuevo array con los elementos que cumplan en su atributo "marca" con el dato enviado como param.
    return array.filter(e => e.marca == dato);
}

//Busca un dato en los elementos del array que se pasa como param.
function buscar(array, dato) {
    //En el array se aplica filter(como elemento devolveme el elem en el que coincida el dato enviado en el atributo "modelo" del elem del array).
    let resultado = array.filter(e => e.modelo.toLowerCase().match(dato.toLowerCase()));
    return resultado;
}

//Captura los datos ingresados en el form y los envía como un SweetAlert.
function capturarForm(event) {
    //Previene que al dar click en el botón del form se refresque la página.
    event.preventDefault();
    //Guarda los valores de los inputs nombre y mail.
    let nombre = document.querySelector('#nombre').value;
    let mail = document.querySelector('#mail').value;

    //Muestra los valores de los input nombre y mail en una alerta con la librería SweetAlert.
    Swal.fire(
        `¡Buen trabajo ${nombre}!`,
        `¡Te llegará la confirmación a tu correo ${mail}!`,
        'success'
    )

    //Resetea el formulario.
    formularioC.reset();
}