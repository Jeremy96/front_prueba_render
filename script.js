// URL del backend
const BASE_URL = 'https://talento-digital-modulo-9-clase-2-sesion.onrender.com' || 'http://localhost:3000';

// Elementos del DOM
const userForm = document.getElementById('user-form');
const userList = document.getElementById('user-list');

// Función para obtener usuarios y mostrarlos
// Función para obtener usuarios y mostrarlos
const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/usuarios`);

    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }

    const users = await response.json();
    
    userList.innerHTML = ''; // Limpiar lista antes de renderizar

    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.nombre} - ${user.correo} - ${user.edad} años`;
      userList.appendChild(li);
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    alert('Hubo un error al obtener los usuarios');
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

    if (!response.ok) {
      throw new Error('Error al agregar el usuario');
    }

    const result = await response.json();
    alert(result.message); // Mostrar mensaje de éxito

    fetchUsers(); // Actualizar la lista de usuarios
    userForm.reset(); // Limpiar el formulario
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    alert('Hubo un error al agregar el usuario');
  }
};

// Event Listener
userForm.addEventListener('submit', addUser);

// Inicializar
fetchUsers();
