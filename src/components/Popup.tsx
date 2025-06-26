import { Button } from "../components/ui";
import CloseButton from "../components/CloseButton";
import jutsuAnbu from "../assets/ilustrations/anbu_jutsu.png";
import { useNavigate } from "react-router-dom";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void; // ✅ opcional
  message: string;
}

function Popup({ isOpen, onClose, onConfirm, message }: PopupProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      navigate(-1); // fallback por compatibilidad
    }
  };

  return (
    <>
      <div className="bg-opacity-20 fixed inset-0 z-40 backdrop-blur-md"></div>
      <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-yellow-anbu relative flex w-80 flex-col items-center rounded-xl p-4 text-center shadow-lg">
          <CloseButton onClick={onClose} />

          <h2 className="text-black-anbu text-lg font-semibold">{message}</h2>

          <div className="my-2 flex justify-center">
            <img
              src={jutsuAnbu}
              alt="Jutsu ANBU"
              className="h-20 w-20 object-contain"
            />
          </div>

          <div className="mt-2 flex gap-2">
            <Button
              onClick={handleConfirm}
              color="bg-black-anbu"
              className="hover:bg-gray-800"
            >
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;
