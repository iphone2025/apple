// carrito.js

// carrito.js

function agregarAlCarrito(codigo, titulo, precio, inputId) {
  const cantidadInput = document.getElementById(inputId);
  const cantidad = cantidadInput.value;

  if (cantidad <= 0) {
    alert("Ingrese una cantidad válida.");
    return;
  }

  const precioNumerico = parseFloat(precio.replace(/[$,]/g, ''));
  const subtotal = precioNumerico * parseInt(cantidad);

  const producto = {
    codigo: codigo,
    titulo: titulo,
    precio: formatCurrency(precioNumerico),
    cantidad: cantidad,
    subtotal: formatCurrency(subtotal),
  };

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.push(producto);
  localStorage.setItem('cart', JSON.stringify(cartItems));

  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoTable = document.getElementById('carritoTable');
  const carritoTableMovil = document.getElementById('carritoTableMovil');
  let total = 0;

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  carritoTable.innerHTML = '';
  carritoTableMovil.innerHTML = '';

  cartItems.forEach((item, index) => {
    const cantidad = parseInt(item.cantidad);
    const precioNumeric = parseFloat(item.precio.replace(/[$.]/g, ''));
    const subtotal = cantidad * precioNumeric;
    total += subtotal;

    // Fila para computadora
    const row = carritoTable.insertRow();
    row.innerHTML = `<div id="carrito.item">
    <tr>
                      <td>${item.codigo}</td>
                      <td><h4>${item.titulo}</h4></td>
                      <td>${item.precio}</td>
                      <td><input type="number" style="width: 40px; height: 40px;" value="${item.cantidad}" onchange="actualizarCantidad(${index}, this.value)"></td>
                      <td><h2>${formatCurrency(subtotal)}</h2></td>
                      <td><a onclick="eliminarFila(${index})"><img src="eliminar.jpeg" alt="Eliminar" style="width: 25px; height: 25px;"></a></td>
                    </tr>
                    </div>`;

  // Fila para móvil
  carritoTableMovil.innerHTML += `
  <div class="carrito-item">
    <div class="item-details">
      <span>${item.codigo}</span>
      <a onclick="eliminarFila(${index})"><img src="eliminar.jpeg" alt="Eliminar"></a>
    </div>
    <h4>${item.titulo}</h4>
    <div class="item-details">
      <span>${item.precio}</span>
      <input type="number" value="${item.cantidad}" onchange="actualizarCantidad(${index}, this.value)">
      <h2>${formatCurrency(subtotal)}</h2>
    </div>
  </div>
`;
});

  document.getElementById('total').textContent = `Total: ${formatCurrency(total)}`;
}

function actualizarCantidad(index, nuevaCantidad) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cartItems[index];

  if (nuevaCantidad <= 0) {
    alert("Ingrese una cantidad válida.");
    return;
  }

  item.cantidad = nuevaCantidad;
  const nuevoSubtotal = parseFloat(item.precio.replace(/[$,.]/g, '')) * parseInt(nuevaCantidad);
  item.subtotal = formatCurrency(nuevoSubtotal);

  localStorage.setItem('cart', JSON.stringify(cartItems));
  actualizarCarrito();
}

function eliminarFila(index) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  actualizarCarrito();
}

function cargarCarrito() {
  actualizarCarrito();
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
}

window.addEventListener('load', cargarCarrito);


  


  
  
  
document.addEventListener("DOMContentLoaded", function() {
  const searchBtn = document.getElementById('buscar-btn');
  if (searchBtn) {
      searchBtn.addEventListener('click', function () {
          const searchTerm = document.getElementById('searchInput').value.toLowerCase();
          const items = document.querySelectorAll('.catalogo-item');
          let found = false; // Bandera para verificar si hay productos encontrados

          // Recorre todos los productos en la página actual
          items.forEach(item => {
              const title = item.querySelector('.titulo').textContent.toLowerCase();
              if (title.includes(searchTerm)) {
                  item.style.display = 'inline-block';
                  found = true; // Se encontró al menos un producto
              } else {
                  item.style.display = 'none';
              }
          });

          // Si no se encuentra en la página actual, redirige a otras páginas
          if (!found) {
              if (searchTerm.includes('iphone')) {
                  window.location.href = 'iphone.html';
              } else if (searchTerm.includes('mackbook') || searchTerm.includes('macbook')) {
                  window.location.href = 'mackbook.html';
              } else if (searchTerm.includes('imac')) {
                  window.location.href = 'imac.html';
              } else if (searchTerm.includes('watch') || searchTerm.includes('watches')) {
                  window.location.href = 'watche.html';
              } else if (searchTerm.includes('accesorio') || searchTerm.includes('accessory')) {
                  window.location.href = 'acesorios.html';
              } else if (searchTerm.includes('carrito') || searchTerm.includes('cart')) {
                  window.location.href = 'carrito.html';
                } else if (searchTerm.includes('catalogo') || searchTerm.includes('catalogo')) {
                  window.location.href = 'index.html';
              } else if (searchTerm.includes('contacto') || searchTerm.includes('contact')) {
                  window.location.href = 'contacto.html';
              } else {
                  alert('Producto no encontrado');
              }
          }
      });
  }

  // Función para alternar el menú en dispositivos móviles
  window.toggleMenu = function() {
      const menuMobile = document.querySelector('.menu-mobile');
      menuMobile.style.display = (menuMobile.style.display === 'block') ? 'none' : 'block';
  };
});

  


  function toggleMenu() {
    const mobileMenu = document.querySelector('.menu-mobile');
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
}



function ordenarPorPrecio(criterio) {
  let catalogo = document.getElementById('catalogo');
  let productos = Array.from(catalogo.getElementsByClassName('catalogo-item'));
  
  productos.sort((a, b) => {
      let precioA = parseFloat(a.querySelector('.precio').innerText);
      let precioB = parseFloat(b.querySelector('.precio').innerText);
      
      return criterio === 'menor' ? precioA - precioB : precioB - precioA;
  });

  // Limpia el catálogo actual
  catalogo.innerHTML = '';

  // Añade los productos ordenados al DOM
  productos.forEach(producto => catalogo.appendChild(producto));
}






window.addEventListener('resize', function() {
  const catalogo = document.getElementById('catalogo');
  if (window.innerWidth <= 768) {
      catalogo.style.gridTemplateColumns = 'repeat(2, 1fr)';
  } else {
      catalogo.style.gridTemplateColumns = 'repeat(4, 1fr)';
  }
});
