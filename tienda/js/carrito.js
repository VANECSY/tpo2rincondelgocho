// Variable para almacenar los productos en el carrito
const carrito = [];

// Realizar una solicitud a la API en PythonAnywhere
fetch('http://giselag.pythonanywhere.com/productos')
    .then(response => response.json())
    .then(data => {
        // Mostrar los datos en el carrito
        displayCartItems(data);
    })
    .catch(error => console.error('Error al obtener datos de la API:', error));

// Función para mostrar los productos en el carrito
function displayCartItems(cartItems) {
    const cartItemsList = document.getElementById('cartItems');

    // Limpiar el contenido anterior del carrito
    cartItemsList.innerHTML = '';

    cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('cart-item');

        listItem.innerHTML = `
            <div class="card">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="product">${item.nombre}</div>
                <div class="price">$${item.precio}</div>
                <div class="stock">Stock: ${item.stock}</div>
                <button class="buy-button" onclick="agregarAlCarrito(${item.precio})">Agregar al Carrito</button>
                <button class="delete-button" onclick="eliminarDelCarrito(${item.precio})">Eliminar</button>
            </div>
        `;

        cartItemsList.appendChild(listItem);
    });

    // Actualizar resumen del carrito (total y cantidad)
    updateCartSummary();
}

// Función para agregar un producto al carrito
function agregarAlCarrito(precio) {
    // Agregar el precio al array del carrito
    carrito.push({ precio });

    // Actualizar la interfaz de usuario
    updateCartSummary();
}

// Función para eliminar un producto del carrito basado en el precio
function eliminarDelCarrito(precio) {
// Encontrar el índice del producto en el array carrito que tiene el precio especificado
const index = carrito.findIndex(item => item.precio === precio);

// Asegurarse de que se encontró el producto en el carrito
if (index !== -1) {
// Eliminar el producto del array del carrito
carrito.splice(index, 1);

// Actualizar la interfaz de usuario
updateCartSummary();
} else {
console.error('No se encontró el producto con el precio en el array carrito:', precio);
}
}


// Función para actualizar el resumen del carrito
function updateCartSummary() {
    const cartTotal = document.getElementById('cartTotal');
    const cartQuantity = document.getElementById('cartQuantity');

    // Cálculos para obtener el total y la cantidad (puedes ajustar según tus necesidades)
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    const cantidad = carrito.length;

    cartTotal.textContent = total;
    cartQuantity.textContent = cantidad;
}