class Producto {
    constructor(name, id, type, price, stock,) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.price = price;
        this.stock = stock;
    }


}




const productos = [
    {
        name: "Alfajor de maní y chocolate FLV",
        id: "001",
        type: "Alfajores",
        price: 800,
        stock: 10,
        img: "./images/alfajor.webp"
    },
    { name: "Bebible sabor chocolate FLV", id: "002", type: "Bebidas", price: 610, stock: 5, img: "./images/chocolatada.webp" },
    { name: "Hummus Garbanzos y Paltas FLV", id: "003", type: "Untables", price: 1005, stock: 15, img: "./images/hummus.webp"  },
    { name: "Galletitas Pepas de Membrillo FLV", id: "004", type: "Galletitas", price: 580, stock: 20, img: "./images/pepas.webp" },
    {name: "Yogurt sabor Frutilla FLV", id: "005", type: "Yogures", price: 505, stock: 8, img: "./images/yogurt.webp"},
]

function imprimirProductos (){
  let contenedor = document.getElementById("contenedorProductos");


  for (const producto of productos) {
    let card = document.createElement("div");
    card.innerHTML = `
    <div class="card" style="width: 15rem;">
    <img src="${producto.img}" class="card-img-top" alt="">
    <div class="card-body producto">
      <h5 class="card-title">${producto.name}</h5>
      <p class="card-text">$${producto.price}</p>
      <a href="#" class="btn " id="agregar${producto.id}" >Comprar</a>
    </div>
  </div>
  `;
  contenedor.appendChild(card);

  }

  let boton = document.getElementById(`agregar${producto.id}`);
  boton.addEventListener("click", () => agregarAlCarrito(producto.id));
  

}

imprimirProductos();

