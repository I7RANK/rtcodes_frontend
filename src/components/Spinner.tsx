import Image from "next/image";

export default function Spinner() {
  return (
    <Image
      className="animate-spin"
      src="/spinner.svg"
      alt="spinner"
      width={24}
      height={24}
    />
  );
}
