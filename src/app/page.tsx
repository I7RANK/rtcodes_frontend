"use client";

import { useState, useEffect } from "react";
import { Store } from "@/types/store.type";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import StoreCard from "@/components/StoreCard";
import CreateStoreForm from "@/components/CreateStoreForm";

export default function Stores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCodeFetch, setIsLoadingCodeFetch] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store>();
  const [storeCode, setStoreCode] = useState("");
  const [isAddingNewStore, setIsAddingNewStore] = useState(false);

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

  const updateCurrentCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStore?._id) return;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/stores/${selectedStore?._id}/code`;

    try {
      setIsLoadingCodeFetch(true);
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: storeCode }),
      });
      if (res.ok) {
        closeCodesModal();
        fetchStores();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingCodeFetch(false);
    }
  };

  const closeCodesModal = () => {
    console.log("closeModal");
    setStoreCode("");
    setSelectedStore(undefined);
  };

  const onCreatedStore = () => {
    setTimeout(() => {
      setIsAddingNewStore(false);
    }, 3000);
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
        ) : stores.length ? (
          stores.map((store) => (
            <StoreCard
              key={store._id}
              name={store.name}
              address={store.address}
              city={store.city}
              currentCode={store.currentCode}
              onAddCode={() => setSelectedStore(store)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center gap-x-2">
            <p className="text-white">No encontraste la tienda?</p>
            <Button
              variant="secondary"
              onClick={() => setIsAddingNewStore(true)}
            >
              Agregar Tienda
            </Button>
          </div>
        )}
      </div>

      <Modal
        key={selectedStore?._id}
        isOpen={selectedStore?._id !== undefined}
        onClose={() => {
          if (!isLoadingCodeFetch) closeCodesModal();
        }}
      >
        <div>
          <h1 className="font-semibold">{selectedStore?.name}</h1>
          <p className="mt-1 text-xs text-gray-500">{selectedStore?.address}</p>
          <p className="mt-1 text-xs text-gray-400">{selectedStore?.city}</p>
          <form className="mt-4" onSubmit={updateCurrentCode}>
            <input
              type="text"
              value={storeCode}
              required
              onChange={(e) => setStoreCode(e.target.value)}
            />
            <div className="mt-2 flex items-center gap-x-2">
              <Button type="submit" disabled={isLoadingCodeFetch}>
                Añadir Código
              </Button>
              {isLoadingCodeFetch && <Spinner />}
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={isAddingNewStore}
        onClose={() => {
          setIsAddingNewStore(false);
        }}
      >
        <CreateStoreForm onSubmit={onCreatedStore} />
      </Modal>
    </div>
  );
}
