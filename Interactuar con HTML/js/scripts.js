class Item {
    constructor (id, categoria, nombre, precio){
        this.id = id;
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = precio;
    }
}

const item1 = new Item(1,'camisetas','estudiantes',6000);
const item2 = new Item(2,'camisetas','boca',7000);
const item3 = new Item(3,'camisetas','river',7000);
const item4 = new Item(4,'camisetas','gimnasia',4000);
const item5 = new Item(5,'camisetas','lanús',5000);
const item6 = new Item(6,'camisetas','racing',5500);
const item7 = new Item(7,'camisetas','talleres',2500);
const item8 = new Item(8,'camisetas','tigre',3000);
const item9 = new Item(9,'camisetas','independiente',7500);

let camisetas = [item1, item2, item3, item4, item5, item6, item7, item8, item9];

let contenedorItems = document.getElementById('contenedorItems');

camisetas.forEach(camiseta => {
    contenedorItems.innerHTML += `
        <div class="col-4 d-flex justify-content-center">
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <div id="camiseta${camiseta.id}" class="itemClass">
                        <p> Categoría: ${camiseta.categoria} </p>
                        <p> Club: ${camiseta.nombre} </p>
                        <p> Precio: $${camiseta.precio} </p>
                    </div>
                </div>
            </div>    
        </div>     
    `
})