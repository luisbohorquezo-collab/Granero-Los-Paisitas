// Catálogo informativo: agrega o edita productos sin incluir precios.
// Fotografías propias en img/; los productos restantes conservan sus imágenes anteriores.
const productos = [
  {id:1, nombre:'Arroz blanco 1 kg', categoria:'Granos y abarrotes', foto:'photo-1586201375761-83865001e31c'},
  {id:2, nombre:'Fríjol rojo 500 g', categoria:'Granos y abarrotes', foto:'img/frijol-rojo.jpg'},
  {id:3, nombre:'Lentejas 500 g', categoria:'Granos y abarrotes', foto:'img/lentejas.jpg'},
  {id:4, nombre:'Garbanzo 500 g', categoria:'Granos y abarrotes', foto:'photo-1515543904379-3d757afe72e4'},
  {id:5, nombre:'Azúcar 1 kg', categoria:'Granos y abarrotes', foto:'img/azucar-incauca.jpg'},
  {id:6, nombre:'Sal 1 kg', categoria:'Granos y abarrotes', foto:'img/sal-refisal.jpg'},
  {id:7, nombre:'Harina de maíz 1 kg', categoria:'Granos y abarrotes', foto:'img/harina-pan.jpg'},
  {id:8, nombre:'Aceite vegetal 1 L', categoria:'Granos y abarrotes', foto:'img/aceite-vegetal.jpg'},
  {id:9, nombre:'Pasta alimenticia 500 g', categoria:'Granos y abarrotes', foto:'img/pastas-doria.jpg'},
  {id:10, nombre:'Café molido 250 g', categoria:'Bebidas y alimentos', foto:'img/cafe-sello-rojo.jpg'},
  {id:11, nombre:'Chocolate de mesa', categoria:'Bebidas y alimentos', foto:'img/chocolate-corona.jpg'},
  {id:12, nombre:'Leche 1 L', categoria:'Bebidas y alimentos', foto:'img/leche.jpg'},
  {id:13, nombre:'Galletas surtidas', categoria:'Bebidas y alimentos', foto:'img/galletas.jpg'},
  {id:14, nombre:'Avena en hojuelas', categoria:'Bebidas y alimentos', foto:'img/avena-quaker.jpg'},
  {id:15, nombre:'Atún en lata', categoria:'Enlatados y conservas', foto:'img/atun.jpg'},
  {id:16, nombre:'Sardinas en lata', categoria:'Enlatados y conservas', foto:'img/sardinas.jpg'},
  {id:17, nombre:'Salsa de tomate', categoria:'Enlatados y conservas', foto:'img/salsa-tomate.jpg'},
  {id:18, nombre:'Mayonesa', categoria:'Enlatados y conservas', foto:'img/mayonesa.jpg'},
  {id:19, nombre:'Detergente en polvo', categoria:'Aseo y hogar', foto:'img/detergente.jpg'},
  {id:20, nombre:'Jabón de lavar', categoria:'Aseo y hogar', foto:'img/jabondelavar.jpg'},
  {id:21, nombre:'Lavaloza', categoria:'Aseo y hogar', foto:'img/jabonPlatos.jpg'},
  {id:22, nombre:'Papel higiénico', categoria:'Aseo y hogar', foto:'img/hijienico.jpg'},
  {id:23, nombre:'Crema dental', categoria:'Cuidado personal', foto:'img/crema-dental.jpg'},
  {id:24, nombre:'Champú', categoria:'Cuidado personal', foto:'img/champu.jpg'},
  {id:25, nombre:'Cerveza', categoria: 'Bebidas y alimentos', foto:'img/cerveza.jpg'},
  {id:26, nombre:'Gaseosas', categoria: 'Bebidas y alimentos', foto:'img/gaseosas.jpg'},
  {id:27, nombre:'Yogurt', categoria: 'Bebidas y alimentos', foto:'img/yogures.jpg'},
  {id:28, nombre:'Salchichas', categoria: 'Bebidas y alimentos', foto:'img/salchichas.jpg'}
];

const buscar = document.querySelector('#buscar');
const categoria = document.querySelector('#categoria');
const contenedor = document.querySelector('#productos');
const contador = document.querySelector('#contador');

[...new Set(productos.map(p => p.categoria))].forEach(nombre => {
  const opcion = document.createElement('option');
  opcion.value = nombre;
  opcion.textContent = nombre;
  categoria.appendChild(opcion);
});

function mostrarProductos() {
  const texto = buscar.value.trim().toLocaleLowerCase('es');
  const seleccion = categoria.value;
  const filtrados = productos.filter(p =>
    p.nombre.toLocaleLowerCase('es').includes(texto) &&
    (seleccion === 'Todas' || p.categoria === seleccion)
  );
  contador.textContent = `${filtrados.length} producto(s) encontrado(s)`;
  contenedor.replaceChildren();
  if (!filtrados.length) {
    const mensaje = document.createElement('p');
    mensaje.className = 'sin-resultados';
    mensaje.textContent = 'No encontramos productos. Prueba con otra búsqueda.';
    contenedor.appendChild(mensaje);
    return;
  }
  filtrados.forEach(p => {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'producto';
    const imagen = document.createElement('img');
    imagen.src = p.foto.startsWith('img/') ? p.foto : `https://images.unsplash.com/${p.foto}?w=600&auto=format&fit=crop&q=80`;
    imagen.alt = `Imagen ilustrativa de ${p.nombre}`;
    imagen.loading = 'lazy';
    const info = document.createElement('div');
    info.className = 'info';
    const tipo = document.createElement('span');
    tipo.className = 'tipo';
    tipo.textContent = p.categoria;
    const titulo = document.createElement('h3');
    titulo.textContent = p.nombre;
    info.append(tipo, titulo);
    tarjeta.append(imagen, info);
    contenedor.appendChild(tarjeta);
  });
}
buscar.addEventListener('input', mostrarProductos);
categoria.addEventListener('change', mostrarProductos);
document.querySelector('#anio').textContent = new Date().getFullYear();
mostrarProductos();
