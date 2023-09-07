class Producto {
    constructor(name, id, type, price, stock,) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.price = price;
        this.stock = stock;
    }
}

const productosBase = [
    {
        name: "Alfajor de maní",
        id: "001",
        type: "Alfajores",
        price: 800,
        stock: 10,

    },
    { name: "Bebible sabor chocolate FLV", id: "002", type: "Bebidas", price: 610, stock: 5 },
    { name: "Hummus Garbanzos y Paltas FLV", id: "003", type: "Untables", price: 1005, stock: 15 },
    { name: "Galletitas Pepas de Membrillo FLV", id: "004", type: "Galletitas", price: 580, stock: 20},
    {name: "Yogurt sabor Frutilla FLV", id: "005", type: "Yogures", price: 505, stock: 8},
]

let listaProductos = []; 

function agregarProducto() {
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const type = document.getElementById('type').value;
    const price = parseFloat(document.getElementById('price').value).toFixed(2);
    const stock = parseInt(document.getElementById('stock').value);

    const nuevoProducto = new Producto(name, id, type, price, stock);

    listaProductos.push(nuevoProducto);
  
}

const nuevoProducto = new Producto("Leche NotMilk", "006", "Leches", 954, 20, "Leche de alta calidad");
listaProductos.push(nuevoProducto);


listaProductos = listaProductos.concat(productosBase);

//_----------------------------------------------





//-----------------------------------------
const carritoProductos = [];

function agregarAlCarrito(producto) {
  carritoProductos.push(producto);

  actualizarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    // Obtener la lista del carrito (ul) y el total (span)
    const listaCarrito = document.getElementById("listaCarrito");
    const totalSpan = document.getElementById("total");
  
    // Limpiar la lista del carrito
    listaCarrito.innerHTML = "";
  
    // Calcular el total y actualizar la lista del carrito
    let total = 0;
  
    carritoProductos.forEach(producto => {
      // Crear un nuevo elemento de lista (li) para cada producto
      const listItem = document.createElement("li");
      listItem.innerText = `${producto.name} - $${producto.price.toFixed(2)}`;
      listaCarrito.appendChild(listItem);
  
      // Sumar el precio al total
      total += parseFloat(producto.price); // Asegúrate de que el precio sea un número
    });
  
    // Actualizar el total en la interfaz
    totalSpan.innerText = total.toFixed(2); // Convierte el total en cadena con 2 decimales
  }
  
// Ahora, puedes usar la función agregarAlCarrito(producto) cuando se haga clic en un botón "Comprar".
// Puedes mantener el código de los botones "Comprar" como lo tenías previamente.

//---------------------------------

const botonesComprar = document.querySelectorAll(".btn");

// Agregar un manejador de eventos a cada botón
botonesComprar.forEach(btn => {
  btn.addEventListener("click", () => { // Cambiar "boton" a "btn" aquí
    // Obtener los detalles del producto seleccionado
    const productoContainer = btn.parentElement;
    const nombreProducto = productoContainer.querySelector("h5").innerText;
    const precioProducto = parseFloat(productoContainer.querySelector("p").innerText.replace("Precio: $", ""));
    
    // Crear un objeto Producto con los detalles
    const productoSeleccionado = new Producto(nombreProducto, "", "", precioProducto, 1);

    // Agregar el producto al carrito
    agregarAlCarrito(productoSeleccionado);
  });
});




//---------------------------------------------------------------
