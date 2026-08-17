import React from 'react';

function fieldValue(field, value) {
  if (value !== undefined && value !== null) {
    return value;
  }
  return field.defaultValue ?? '';
}

function readValue(rawValue, field) {
  if (rawValue === '') {
    return field.required ? rawValue : null;
  }

  if (field.type === 'number' || field.valueType === 'number') {
    return Number(rawValue);
  }

  if (field.type === 'boolean') {
    return rawValue === 'true';
  }

  return typeof rawValue === 'string' ? rawValue.trim() : rawValue;
}

function FieldInput({ field, value, onChange }) {
  if (field.type === 'select' || field.type === 'boolean') {
    const options = field.type === 'boolean'
      ? [
          { value: 'true', label: 'Si' },
          { value: 'false', label: 'No' }
        ]
      : field.options || [];

    return (
      <select
        name={field.name}
        required={Boolean(field.required)}
        value={String(fieldValue(field, value))}
        onChange={(event) => onChange(field.name, event.target.value)}
      >
        {!field.required ? <option value="">Sin valor</option> : null}
        {options.map((option) => (
          <option key={`${field.name}-${option.value}`} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      name={field.name}
      type={field.type || 'text'}
      required={Boolean(field.required)}
      value={fieldValue(field, value)}
      maxLength={field.maxLength}
      onChange={(event) => onChange(field.name, event.target.value)}
    />
  );
}

export function FormRenderer({ fields, values = {}, submitLabel, onCancel, onSubmit }) {
  const [formState, setFormState] = React.useState(() => {
    const nextState = {};

    for (const field of fields) {
      nextState[field.name] = fieldValue(field, values[field.name]);
    }

    return nextState;
  });

  React.useEffect(() => {
    const nextState = {};

    for (const field of fields) {
      nextState[field.name] = fieldValue(field, values[field.name]);
    }

    setFormState(nextState);
  }, [fields, values]);

  function handleChange(name, value) {
    setFormState((current) => ({
      ...current,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {};

    for (const field of fields) {
      payload[field.name] = readValue(formState[field.name], field);
    }

    onSubmit(payload);
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <label key={field.name} className="field">
          <span>{field.label}</span>
          <FieldInput field={field} value={formState[field.name]} onChange={handleChange} />
        </label>
      ))}

      <div className="form-actions">
        <button className="button primary" type="submit">{submitLabel}</button>
        <button className="button secondary" type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}
