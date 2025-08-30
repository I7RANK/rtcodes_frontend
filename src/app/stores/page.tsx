"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Store } from "@/types/store.type";

export default function Stores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchStores = async (name?: string) => {
    setIsLoading(true);
    let url = `${process.env.NEXT_PUBLIC_API_URL}/stores`;
    if (name) url += `?name=${name}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setStores(data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchStores(searchValue);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [searchValue]);

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div className="px-4 pt-10">
      <div>
        <input
          className="text-xl"
          value={searchValue}
          id="search"
          type="text"
          placeholder="Buscar por nombre"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div className="mt-8 grid gap-4">
        {isLoading ? (
          <p className="text-green-300">Cargando tiendas...</p>
        ) : (
          stores.map((store) => (
            <div
              key={store._id}
              className="rounded-md bg-white px-2 py-4 shadow-2xl"
            >
              <h1 className="font-semibold">{store.name}</h1>
              <p className="mt-1 text-xs text-gray-500">{store.address}</p>
              <p className="mt-1 text-xs text-gray-400">{store.city}</p>
              {store.currentCode?.code ? (
                <p className="mt-1 text-4xl font-semibold tabular-nums">
                  store.currentCode?.code
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1">
                  <p className="text-sm text-gray-600">No hay Código aun?</p>
                  <button className="rounded-sm bg-sky-900 px-4 py-1 text-sm text-white">
                    Agregar Código
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/create-store">
          <button className="rounded-sm bg-sky-900 px-4 py-2 text-sm text-white">
            Agregar Nueva Tienda
          </button>
        </Link>
      </div>
    </div>
  );
}
