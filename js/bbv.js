class Producto {
  constructor(name, id, type, price, stock) {
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
  {name: "Yogurt sabor Frutilla FLV", id: "005", type: "Yogures", price: 505, stock: 8, img: "./images/yogurt.webp"},];

const carrito = []; 

function imprimirProductos() {
  let contenedor = document.getElementById("contenedorProductos");

  for (const producto of productos) {
      let card = document.createElement("div");
      card.innerHTML = `
      <div class="card" style="width: 15rem;">
          <img src="${producto.img}" class="card-img-top" alt="">
          <div class="card-body producto">
              <h5 class="card-title">${producto.name}</h5>
              <p class="card-text">$${producto.price}</p>
              <a href="#" class="btn agregar-al-carrito" data-id="${producto.id}" data-precio="${producto.price}">Comprar</a>
          </div>
      </div>
      `;
      contenedor.appendChild(card);
  }

  const botonesComprar = document.querySelectorAll(".agregar-al-carrito");
  botonesComprar.forEach(boton => {
      boton.addEventListener("click", (event) => {
          const idProducto = event.target.getAttribute("data-id");
          agregarAlCarrito(idProducto);
      });
  });
}

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
      actualizarCarrito();
  }
}

class ProductoCarrito {
  constructor(producto) {
      this.id = producto.id;
      this.nombre = producto.name;
      this.precio = producto.price;
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

function actualizarCarrito() {
  const listaCarrito = document.getElementById("listaCarrito");
  listaCarrito.innerHTML = "";
  let total = 0;

  for (const producto of carrito) {
      const listItem = document.createElement("li");
      listItem.textContent = `${producto.nombre} x${producto.cantidad} - $${producto.precioTotal}`;
      listaCarrito.appendChild(listItem);
      total += producto.precioTotal;
  }

  const totalElement = document.getElementById("total");
  totalElement.textContent = total.toFixed(2);
}

imprimirProductos();
