import CreateStoreForm from "@/components/CreateStoreForm";

export default function CreateStore() {
  return (
    <div className="flex flex-col items-center pt-10">
      <section className="relative w-full px-4">
        <CreateStoreForm />
      </section>
      <div className="absolute top-0 -z-10 h-52 w-full bg-linear-to-br from-sky-800 to-sky-950"></div>
    </div>
  );
}
