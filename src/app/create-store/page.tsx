import CreateStoreForm from "@/components/CreateStoreForm";

export default function CreateStore() {
  return (
    <div className="flex flex-col items-center bg-amber-50 pt-10">
      <section className="relative w-full">
        <CreateStoreForm />
      </section>
    </div>
  );
}
