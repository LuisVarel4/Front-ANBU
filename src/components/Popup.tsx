import { Button } from "../components/ui";
import CloseButton from '../components/CloseButton';
import jutsuAnbu from '../assets/ilustrations/anbu_jutsu.png';
import { useNavigate } from 'react-router-dom';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

function Popup({ isOpen, onClose, message }: PopupProps) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <>
      {/* Fondo borroso detrás del popup */}
      <div className="fixed inset-0 bg-opacity-20 backdrop-blur-md z-40"></div>
      {/* Popup en su posición original */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-yellow-anbu p-4 rounded-xl shadow-lg text-center w-80 flex flex-col items-center relative">
          {/* Botón cerrar (X) */}
          <CloseButton onClick={onClose} />

          <h2 className="text-lg font-semibold text-black-anbu">{message}</h2>
          <div className="flex justify-center my-2">
            <img
              src={jutsuAnbu}
              alt="Jutsu ANBU"
              className="w-20 h-20 object-contain"
            />
          </div>
          <Button
            onClick={() => navigate(-1)}
            color="bg-black-anbu"
            className="hover:bg-gray-800 mt-2"
          >
            Aceptar
          </Button>
        </div>
      </div>
    </>
  );
}

export default Popup;