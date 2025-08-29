import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="py-20 text-center text-4xl text-white">Bienvenidos</h1>

      <div className="mt-5 flex flex-col items-center justify-center gap-y-2">
        <Link href="/stores">
          <button className="rounded-sm bg-sky-900 px-4 py-2 text-sm text-white">
            Ver todas las tiendas
          </button>
        </Link>
        <Link href="/create-store">
          <button className="rounded-sm bg-sky-900 px-4 py-2 text-sm text-white">
            Agregar Nueva Tienda
          </button>
        </Link>
      </div>
    </div>
  );
}
