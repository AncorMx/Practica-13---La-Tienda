import { useState } from 'react';
import { productos as productosIniciales } from './datos';
import type { Producto } from './datos';
import { Layout } from './componentes/Layout';
import { Encabezado } from './componentes/Encabezado';
import { PiePagina } from './componentes/PiePagina';
import { Filtros } from './componentes/Filtros';
import type { Categoria } from './componentes/Filtros';
import { Catalogo } from './componentes/Catalogo';

function App() {
  const [filtro, setFiltro] = useState<Categoria>('todas');
  const [carrito, setCarrito] = useState<Producto[]>([]);

  function agregarAlCarrito(producto: Producto) {
    setCarrito((anterior) => [...anterior, producto]);
  }

  const productosFiltrados =
    filtro === 'todas'
      ? productosIniciales
      : productosIniciales.filter((producto) => producto.categoria === filtro);

  const piezas = carrito.length;
  const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);

  return (
    <Layout
      encabezado={<Encabezado piezas={piezas} />}
      pie={<PiePagina piezas={piezas} total={total} />}
    >
      <section className="portada">
        <h1>Catálogo de temporada</h1>
        <p>{productosFiltrados.length} producto(s)</p>
      </section>

      <Filtros activa={filtro} onCambiar={setFiltro} />
      <Catalogo productos={productosFiltrados} onAgregar={agregarAlCarrito} />
    </Layout>
  );
}

export default App;
