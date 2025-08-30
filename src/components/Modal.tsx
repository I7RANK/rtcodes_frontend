import { ReactNode } from "react";

type ModalProps = Readonly<{
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}>;

export default function Modal({
  isOpen,
  onClose = () => {},
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-80 rounded-xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
