// URL del backend
const BASE_URL = 'http://localhost:3000';//no usar esta url porque es la del profesor y ustedes al crearlo tendran otra 'https://talento-digital-modulo-9-clase-2-sesion.onrender.com' || 'http://localhost:3000';

// Elementos del DOM
const userForm = document.getElementById('user-form');
const userList = document.getElementById('user-list');

// Función para obtener usuarios y mostrarlos
const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/usuarios`);
    const users = await response.json();
    
    userList.innerHTML = ''; // Limpiar lista antes de renderizar

    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.nombre} - ${user.correo} - ${user.edad} años`;
      userList.appendChild(li);
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
};

// Función para agregar un nuevo usuario
const addUser = async (event) => {
  event.preventDefault(); // Prevenir recarga de la página

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const edad = document.getElementById('edad').value;

  try {
    const response = await fetch(`${BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo, edad }),
    });

    if (response.ok) {
      alert('Usuario agregado exitosamente');
      fetchUsers(); // Actualizar la lista de usuarios
      userForm.reset(); // Limpiar el formulario
    } else {
      alert('Error al agregar el usuario');
    }
  } catch (error) {
    console.error('Error al agregar usuario:', error);
  }
};

// Event Listener
userForm.addEventListener('submit', addUser);

// Inicializar
fetchUsers();
