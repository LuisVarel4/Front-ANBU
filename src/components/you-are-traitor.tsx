import { Button } from "../components/ui";
import CloseButton from "../components/CloseButton";
import anbuHoodie from "../assets/ilustrations/anbu_hoodie_bg.png";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

function PopupTraitor({ isOpen, onClose, message }: PopupProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Fondo borroso detrás del popup */}
      <div className="bg-opacity-20 fixed inset-0 z-40 backdrop-blur-md"></div>
      {/* Popup en su posición original */}
      <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-yellow-anbu relative flex w-80 flex-col items-center rounded-xl p-4 text-center shadow-lg">
          {/* Botón cerrar (X) */}
          <CloseButton onClick={onClose} />

          <h2 className="text-black-anbu text-lg font-semibold">{message}</h2>
          <div className="my-2 flex justify-center">
            <img
              src={anbuHoodie}
              alt="Jutsu ANBU"
              className="h-20 w-20 object-contain"
            />
          </div>
          <Button
            onClick={onClose}
            color="bg-black-anbu"
            className="mt-2 hover:bg-gray-800"
          >
            Aceptar
          </Button>
        </div>
      </div>
    </>
  );
}

export default PopupTraitor;
