import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Bienvenidos</h1>
      <Link
        className="bg-gray-50 py-2 px-4 rounded-md text-black active:bg-gray-100"
        href="/create-store"
      >
        Crear tienda
      </Link>
    </div>
  );
}
