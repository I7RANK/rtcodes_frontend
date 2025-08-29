import CreateStoreForm from "@/components/CreateStoreForm";

export default function CreateStore() {
  return (
    <div className="flex flex-col items-center pt-10">
      <section className="relative w-full px-4">
        <CreateStoreForm />
      </section>
    </div>
  );
}
