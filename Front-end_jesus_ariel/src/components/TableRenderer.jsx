import React from 'react';

function formatValue(value, formatter) {
  if (formatter) {
    return formatter(value);
  }

  if (typeof value === 'boolean') {
    return value ? 'Si' : 'No';
  }

  return value ?? '';
}

export function TableRenderer({ columns, rows, onEdit, onDelete }) {
  if (!rows.length) {
    return (
      <div className="table-wrap">
        <p className="empty-state">No hay registros.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={`${row.id}-${column.key}`}>
                  {formatValue(row[column.key], column.format)}
                </td>
              ))}
              <td className="row-actions">
                <button className="button small secondary" type="button" onClick={() => onEdit(row)}>
                  Editar
                </button>
                <button className="button small danger" type="button" onClick={() => onDelete(row)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
