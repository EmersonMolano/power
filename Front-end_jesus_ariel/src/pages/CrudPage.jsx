import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FormRenderer } from '../components/FormRenderer.jsx';
import { TableRenderer } from '../components/TableRenderer.jsx';
import { bibliotecaApi } from '../services/api.js';

export function CrudPage({ config }) {
  const [rows, setRows] = useState([]);
  const [supportData, setSupportData] = useState({});
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const searchRef = useRef(null);

  async function load() {
    setLoading(true);
    setError('');

    try {
      const nextSupportData = config.loadSupportData ? await config.loadSupportData() : {};
      const nextRows = await bibliotecaApi.list(config.resource);
      setSupportData(nextSupportData);
      setRows(nextRows);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [config]);

  const fields = useMemo(() => (
    typeof config.fields === 'function' ? config.fields(supportData) : config.fields
  ), [config, supportData]);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return rows;
    }

    return rows.filter((row) => config.columns.some((column) => {
      const value = row[column.key];
      return String(value ?? '').toLowerCase().includes(normalizedQuery);
    }));
  }, [config.columns, query, rows]);

  useEffect(() => {
    if (searchRef.current && document.activeElement === searchRef.current) {
      const length = searchRef.current.value.length;
      searchRef.current.setSelectionRange(length, length);
    }
  }, [query]);

  async function submit(payload) {
    setError('');
    setMessage('');

    try {
      if (editing) {
        await bibliotecaApi.update(config.resource, editing.id, payload);
        setMessage('Registro actualizado.');
      } else {
        await bibliotecaApi.create(config.resource, payload);
        setMessage('Registro guardado.');
      }

      setEditing(null);
      await load();
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  async function remove(row) {
    const ok = window.confirm('Eliminar este registro?');

    if (!ok) {
      return;
    }

    try {
      await bibliotecaApi.remove(config.resource, row.id);
      setMessage('Registro eliminado.');
      await load();
    } catch (removeError) {
      setError(removeError.message);
    }
  }

  function renderStatus() {
    if (loading) {
      return 'Cargando...';
    }

    if (error) {
      return error;
    }

    if (message) {
      return message;
    }

    if (query.trim()) {
      return `${filteredRows.length} de ${rows.length} registros`;
    }

    return `${rows.length} registros`;
  }

  const statusClassName = [
    'status-line',
    error ? 'error' : '',
    !error && message ? 'success' : ''
  ].filter(Boolean).join(' ');

  return (
    <section className="crud-page">
      <div className="section-header">
        <h2>{config.title}</h2>
        <button
          className="button primary"
          type="button"
          onClick={() => {
            setEditing(null);
            setMessage('');
            setError('');
          }}
        >
          Nuevo
        </button>
      </div>

      <div className={statusClassName}>{renderStatus()}</div>

      <div className="toolbar">
        <input
          ref={searchRef}
          className="search-input"
          type="search"
          placeholder="Buscar"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <FormRenderer
        fields={fields}
        values={editing || config.defaultValues || {}}
        submitLabel={editing ? 'Actualizar' : 'Guardar'}
        onCancel={() => {
          setEditing(null);
          setError('');
        }}
        onSubmit={submit}
      />

      <TableRenderer
        columns={config.columns}
        rows={filteredRows}
        onEdit={(row) => {
          setEditing(row);
          setError('');
          setMessage('');
        }}
        onDelete={remove}
      />
    </section>
  );
}
