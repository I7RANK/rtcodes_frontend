'use client';

import { useState } from 'react';

export default function CreateStore() {
  const [form, setForm] = useState({ name: '', address: '', city: '' });
  const cities = ['Barranquilla', 'Bogota', 'Cali'];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(process.env.NEXT_PUBLIC_API_URL);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-amber-50 flex flex-col items-center">
      <h1>Añadir nueva tienda</h1>
      <section>
        <form onSubmit={handleSubmit}>
          <label className="" htmlFor="name">
            Nombre de la tienda:{' '}
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          Dirección:{' '}
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <fieldset>
            <legend>Ciudad:</legend>
            {cities.map((city) => {
              return (
                <div key={city}>
                  <input
                    type="radio"
                    name="city"
                    id={city}
                    value={city}
                    checked={form.city === city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                  <label htmlFor={city}>{city}</label>
                </div>
              );
            })}
          </fieldset>
          <button
            className="bg-blue-400 px-4 py-2 rounded-md shadow"
            type="submit"
          >
            Crear Tienda
          </button>
        </form>
      </section>
      {JSON.stringify(form, null, 2)}
    </div>
  );
}
