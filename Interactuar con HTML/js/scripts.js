class Item {
    constructor (id, categoria, nombre, precio, img){
        this.id = id;
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
    }
}

const camiseta1 = new Item(1,'camisetas','estudiantes',6000, "./img/estudiantes.jpg");
const camiseta2 = new Item(2,'camisetas','boca',7000, "./img/boca.jpg");
const camiseta3 = new Item(3,'camisetas','river',7000, "./img/river.jpg");
const camiseta4 = new Item(4,'camisetas','gimnasia',4000, "./img/gimnasia.jpg");
const camiseta5 = new Item(5,'camisetas','lanús',5000, "./img/lanus.jpg");
const camiseta6 = new Item(6,'camisetas','racing',5500, "./img/racing.jpeg");
const camiseta7 = new Item(7,'camisetas','talleres',2500, "./img/talleres.jpeg");
const camiseta8 = new Item(8,'camisetas','barcelona',9000, "./img/barcelona.jpg");
const camiseta9 = new Item(9,'camisetas','independiente',7500, "./img/independiente.jpeg");

const pelota1 = new Item(1,'pelotas','nike',6000, "./img/Pelotas/nike.jpeg");
const pelota2 = new Item(2,'pelotas','adidas',7000, "./img/Pelotas/adidas.jpeg");
const pelota3 = new Item(3,'pelotas','puma',7000, "./img/Pelotas/puma.jpeg");
const pelota4 = new Item(4,'pelotas','penalty',4000, "./img/Pelotas/penalty.jpeg");
const pelota5 = new Item(5,'pelotas','mikasa',5000, "./img/Pelotas/mikasa.jpeg");
const pelota6 = new Item(6,'pelotas','molten',5500, "./img/Pelotas/molten.jpeg");



let mercaderias = [camiseta1, camiseta2, camiseta3, camiseta4, camiseta5, camiseta6, camiseta7, camiseta8, camiseta9, pelota1, pelota2, pelota3, pelota4, pelota5, pelota6];

let contenedorItems = document.getElementById('contenedorItems');

mercaderias.forEach(mercaderia => {
    switch (mercaderia.categoria) {
        case 'camisetas':
            contenedorItems.innerHTML += `
                <h2> 
                <div class="col-4 d-flex justify-content-center mt-5">
                    <div class="card" style="width: 18rem;">
                        <img src="${mercaderia.img}" class="card-img-top" alt="camiseta">
                        <div class="card-body">
                            <div id="camiseta${mercaderia.id}" class="itemClass">
                                <p class="textoCamiseta"> Categoría: ${mercaderia.categoria} </p>
                                <p class="textoCamiseta"> Club: ${mercaderia.nombre} </p>
                                <p class="textoCamiseta"> Precio: $${mercaderia.precio} </p>
                                <a href="#" class="btn botonCamiseta">Agregar al carrito</a>
                            </div>
                        </div>
                    </div>    
                </div>     
            `
        case 'pelotas':
            contenedorItems.innerHTML += `
                <div class="col-4 d-flex justify-content-center mt-5">
                    <div class="card" style="width: 18rem;">
                        <img src="${mercaderia.img}" class="card-img-top" alt="camiseta">
                        <div class="card-body">
                            <div id="camiseta${mercaderia.id}" class="itemClass">
                                <p class="textoCamiseta"> Categoría: ${mercaderia.categoria} </p>
                                <p class="textoCamiseta"> Club: ${mercaderia.nombre} </p>
                                <p class="textoCamiseta"> Precio: $${mercaderia.precio} </p>
                                <a href="#" class="btn botonCamiseta">Agregar al carrito</a>
                            </div>
                        </div>
                    </div>    
                </div>     
            `
    }
})