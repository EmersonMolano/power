import React, { useState } from 'react';
import { CrudPage } from './pages/CrudPage.jsx';
import { bibliotecaApi, API_BASE } from './services/api.js';

const resources = [
  {
    key: 'usuarios',
    tab: 'Usuarios',
    title: 'Usuarios',
    resource: 'usuarios',
    fields: [
      { name: 'nombre', label: 'Nombre', required: true, maxLength: 120 },
      { name: 'correo', label: 'Correo', type: 'email', required: true, maxLength: 160 },
      { name: 'telefono', label: 'Telefono', maxLength: 40 }
    ],
    columns: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'correo', label: 'Correo' },
      { key: 'telefono', label: 'Telefono' }
    ]
  },
  {
    key: 'libros',
    tab: 'Libros',
    title: 'Libros',
    resource: 'libros',
    defaultValues: { disponible: true },
    fields: [
      { name: 'titulo', label: 'Titulo', required: true, maxLength: 180 },
      { name: 'autor', label: 'Autor', required: true, maxLength: 140 },
      { name: 'isbn', label: 'ISBN', required: true, maxLength: 30 },
      { name: 'categoria', label: 'Categoria', required: true, maxLength: 80 },
      { name: 'disponible', label: 'Disponible', type: 'boolean', required: true, defaultValue: true }
    ],
    columns: [
      { key: 'titulo', label: 'Titulo' },
      { key: 'autor', label: 'Autor' },
      { key: 'isbn', label: 'ISBN' },
      { key: 'categoria', label: 'Categoria' },
      { key: 'disponible', label: 'Disponible' }
    ]
  },
  {
    key: 'prestamos',
    tab: 'Prestamos',
    title: 'Prestamos',
    resource: 'prestamos',
    defaultValues: { estado: 'PRESTADO' },
    async loadSupportData() {
      const [usuarios, libros] = await Promise.all([
        bibliotecaApi.list('usuarios'),
        bibliotecaApi.list('libros')
      ]);
      return { usuarios, libros };
    },
    fields(data) {
      const usuarios = data.usuarios || [];
      const libros = data.libros || [];

      return [
        {
          name: 'usuarioId',
          label: 'Usuario',
          type: 'select',
          valueType: 'number',
          required: true,
          options: usuarios.map((usuario) => ({
            value: usuario.id,
            label: usuario.nombre
          }))
        },
        {
          name: 'libroId',
          label: 'Libro',
          type: 'select',
          valueType: 'number',
          required: true,
          options: libros.map((libro) => ({
            value: libro.id,
            label: libro.titulo
          }))
        },
        { name: 'fechaPrestamo', label: 'Fecha prestamo', type: 'date' },
        { name: 'fechaDevolucion', label: 'Fecha devolucion', type: 'date' },
        {
          name: 'estado',
          label: 'Estado',
          type: 'select',
          required: true,
          defaultValue: 'PRESTADO',
          options: [
            { value: 'PRESTADO', label: 'Prestado' },
            { value: 'DEVUELTO', label: 'Devuelto' },
            { value: 'CANCELADO', label: 'Cancelado' }
          ]
        }
      ];
    },
    columns: [
      { key: 'usuarioNombre', label: 'Usuario' },
      { key: 'libroTitulo', label: 'Libro' },
      { key: 'fechaPrestamo', label: 'Prestamo' },
      { key: 'fechaDevolucion', label: 'Devolucion' },
      { key: 'estado', label: 'Estado' }
    ]
  }
];

export function App() {
  const [activeKey, setActiveKey] = useState(resources[0].key);
  const activeResource = resources.find((resource) => resource.key === activeKey) || resources[0];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">B</span>
          <div>
            <strong>Biblioteca</strong>
            <small>Panel administrativo</small>
          </div>
        </div>

        <nav className="tabs" aria-label="Secciones">
          {resources.map((resource) => (
            <button
              key={resource.key}
              type="button"
              className={resource.key === activeKey ? 'active' : ''}
              onClick={() => setActiveKey(resource.key)}
            >
              <span>{resource.tab.slice(0, 1)}</span>
              {resource.tab}
            </button>
          ))}
        </nav>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Gestion de biblioteca</p>
            <h1>{activeResource.title}</h1>
          </div>
          <span className="api-badge">{API_BASE}</span>
        </header>

        <main className="main-panel">
          <CrudPage key={activeResource.key} config={activeResource} />
        </main>
      </div>
    </div>
  );
}
