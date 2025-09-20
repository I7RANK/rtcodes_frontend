import { isDateBeforeFiveAM } from "@/utils/isDateBeforeFiveAM";
import type { CurrentCode } from "@/types/store.type";

type StoreCardProps = Readonly<{
  name: string;
  address: string | undefined;
  city: string | undefined;
  currentCode?: CurrentCode;
  onAddCode: Function;
}>;

export default function StoreCard({
  name,
  address,
  city,
  currentCode,
  onAddCode,
}: StoreCardProps) {
  return (
    <div className="rounded-md bg-white px-2 py-4 shadow-2xl">
      <h1 className="font-semibold">{name}</h1>
      <p className="mt-1 text-xs text-gray-500">{address}</p>
      <p className="mt-1 text-xs text-gray-400">{city}</p>
      {currentCode?.code && !isDateBeforeFiveAM(currentCode?.createdAt) ? (
        <p className="mt-1 text-4xl font-semibold tabular-nums">
          {currentCode?.code}
        </p>
      ) : (
        <div className="mt-1 flex items-center gap-x-1">
          <p className="text-sm text-gray-600">No hay Código aun?</p>
          <button
            className="rounded-sm bg-sky-900 px-4 py-1 text-sm text-white"
            onClick={() => onAddCode()}
          >
            Agregar Código
          </button>
        </div>
      )}
    </div>
  );
}
