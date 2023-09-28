// Función para guardar el carrito en el almacenamiento local
function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para actualizar el carrito en la página
function actualizarCarrito() {
  const listaCarrito = document.getElementById("listaCarrito");
  listaCarrito.innerHTML = "";
  let total = 0;

  for (const producto of carrito) {
    const elementoLista = document.createElement("li");
    elementoLista.textContent = `${producto.nombre} x${producto.cantidad} - $${producto.precioTotal}`;
    listaCarrito.appendChild(elementoLista);
    total += producto.precioTotal;
  }

  const totalElemento = document.getElementById("total");
  totalElemento.textContent = total.toFixed(2);
}

// Función para cargar el carrito desde el almacenamiento local
function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito.length = 0;
    const carritoParseado = JSON.parse(carritoGuardado);
    carritoParseado.forEach(item => {
      const producto = productos.find(p => p.id === item.id);
      if (producto) {
        const productoCarrito = new ProductoCarrito(producto);
        productoCarrito.cantidad = item.cantidad;
        productoCarrito.actualizarPrecioTotal();
        carrito.push(productoCarrito);
      }
    });
    actualizarCarrito();
  }
}

// Clase Producto
class Producto {
  constructor(nombre, id, tipo, precio, stock) {
    this.nombre = nombre;
    this.id = id;
    this.tipo = tipo;
    this.precio = precio;
    this.stock = stock;
  }
}

// Array de productos
const productos = [
  { nombre: "Alfajor de maní y chocolate FLV", id: "001", tipo: "Alfajores", precio: 800, stock: 10, img: "./images/alfajor.webp" },
  { nombre: "Bebida sabor chocolate FLV", id: "002", tipo: "Bebidas", precio: 610, stock: 5, img: "./images/chocolatada.webp" },
  { nombre: "Hummus Garbanzos y Paltas FLV", id: "003", tipo: "Untables", precio: 1005, stock: 15, img: "./images/hummus.webp" },
  { nombre: "Galletitas Pepas de Membrillo FLV", id: "004", tipo: "Galletitas", precio: 580, stock: 20, img: "./images/pepas.webp" },
  { nombre: "Yogurt sabor Frutilla FLV", id: "005", tipo: "Yogures", precio: 505, stock: 8, img: "./images/yogurt.webp" },
];

// Array del carrito
const carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
  const productoSeleccionado = productos.find(producto => producto.id === idProducto);
  if (productoSeleccionado) {
    let productoEnCarrito = carrito.find(item => item.id === idProducto);
    if (productoEnCarrito) {
      productoEnCarrito.agregarUnidad();
      productoEnCarrito.actualizarPrecioTotal();
    } else {
      carrito.push(new ProductoCarrito(productoSeleccionado));
    }
    // Invoco la función para actualizar el carrito
    actualizarCarrito();
    // Invoco la función para guardar el carrito en el almacenamiento local
    guardarCarritoEnLocalStorage();
  }
}

// Función para imprimir los productos en la página
function imprimirProductos() {
  let contenedor = document.getElementById("contenedorProductos");

  for (const producto of productos) {
    let card = document.createElement("div");
    card.innerHTML = `
      <div class="card" style="width: 15rem;">
          <img src="${producto.img}" class="card-img-top" alt="">
          <div class="card-body producto">
              <h5 class="card-title">${producto.nombre}</h5>
              <p class="card-text">$${producto.precio}</p>
              <a href="#" class="btn agregar-al-carrito" data-id="${producto.id}" data-precio="${producto.precio}">Comprar</a>
          </div>
      </div>
      `;
    contenedor.appendChild(card);
  }

  const botonesComprar = document.querySelectorAll(".agregar-al-carrito");
  botonesComprar.forEach(boton => {
    boton.addEventListener("click", (event) => {
      const idProducto = event.target.getAttribute("data-id");
      // Invoco la función para agregar al carrito
      agregarAlCarrito(idProducto);
    });
  });
}

// Clase ProductoCarrito
class ProductoCarrito {
  constructor(producto) {
    this.id = producto.id;
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.cantidad = 1;
    this.precioTotal = this.precio * this.cantidad;
  }

  agregarUnidad() {
    this.cantidad++;
    this.actualizarPrecioTotal();
  }

  quitarUnidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
      this.actualizarPrecioTotal();
    }
  }

  actualizarPrecioTotal() {
    this.precioTotal = this.precio * this.cantidad;
  }
}

// Invoco la función para cargar el carrito desde el almacenamiento local
cargarCarritoDesdeLocalStorage();

// Invoco la función para imprimir los productos en la página
imprimirProductos();
