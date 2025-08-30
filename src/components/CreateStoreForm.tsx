"use client";

import { useState } from "react";
import Image from "next/image";

export default function CreateStoreForm() {
  const [form, setForm] = useState({ name: "", address: "", city: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const cities = ["Barranquilla", "Bogota", "Cali"];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(
          `Request failed with status ${res.status} - ${res.statusText} | ${JSON.stringify(errorBody)}`,
        );
      }
      resetForm();
      showSuccessMessage();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = async () => {
    setForm({ name: "", address: "", city: "" });
  };

  const showSuccessMessage = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-lg font-bold">Añadir nueva tienda</h1>
      <p className="mt-1 text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
        explicabo aliquid culpa vitae fugiat? Quaerat tenetur
      </p>
      <div className="mt-2 flex flex-col gap-y-2">
        <div>
          <label htmlFor="name">
            Nombre de la tienda <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Frisby"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="address">Dirección</label>
          <input
            id="address"
            type="text"
            placeholder="Cll. 98 # 51b - 55"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
        <fieldset>
          <legend>
            Ciudad <span className="text-red-400">*</span>
          </legend>
          {cities.map((city) => {
            return (
              <div key={city}>
                <input
                  id={city}
                  type="radio"
                  name="city"
                  required
                  value={city}
                  checked={form.city === city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
                <label className="ml-1 font-normal" htmlFor={city}>
                  {city}
                </label>
              </div>
            );
          })}
        </fieldset>
      </div>

      <button
        className="mt-4 flex items-center justify-center rounded-md bg-sky-400 px-4 py-2 shadow disabled:bg-gray-200 disabled:inset-shadow-sm"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? (
          <Image
            className="animate-spin"
            src="/spinner.svg"
            alt="spinner"
            width={24}
            height={24}
          />
        ) : (
          "Añadir Tienda"
        )}
      </button>

      <p
        className={`mt-2 text-center text-sm font-semibold text-green-600 transition-opacity ${
          success ? "opacity-100" : "opacity-0"
        }`}
      >
        Tienda Añadida Correctamente
      </p>
    </form>
  );
}
