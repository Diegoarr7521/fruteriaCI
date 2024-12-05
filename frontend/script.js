document.addEventListener('DOMContentLoaded', (event) => {
    var fruitForm = document.getElementById('fruitForm');
    var fruitList = document.getElementById('fruitList');

    fruitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var nombre_fruta = document.getElementById('nombre').value;
        var cantidad = document.getElementById('cantidad').value;
        var precio_fruta = document.getElementById('precio').value;

        fetch('http://localhost:3001/api/frutas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre_fruta: nombre_fruta, cantidad: cantidad, precio_fruta: precio_fruta }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('nombre').value = '';
                document.getElementById('cantidad').value = '';
                document.getElementById('precio').value = '';
                loadFruits();
            }
        })
        .catch(error => {
            console.error('Error en la petición fetch:', error);
        });
    });

    function loadFruits() {
        fetch('http://localhost:3001/api/frutas')
            .then(response => response.json())
            .then(fruits => {
                if (Array.isArray(fruits)) {
                    fruitList.innerHTML = '';
                    fruits.forEach(fruit => {
                        var li = document.createElement('li');
                        li.textContent = `${fruit.nombre_fruta} - Cantidad: ${fruit.cantidad} - Precio: $${fruit.precio_fruta}`;
                        fruitList.appendChild(li);
                    });
                } else {
                    console.error('Datos inválidos:', fruits);
                }
            })
            .catch(error => {
                console.error('Error en la petición fetch:', error); 
            });
    }

    loadFruits();
});
