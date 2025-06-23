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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-yellow-anbu p-6 rounded-xl shadow-lg text-center w-80 min-h-[340px] flex flex-col justify-between">
        {/* Botón cerrar (X) */}
        <CloseButton onClick={onClose} />

        {/* Mensaje */}
        <h2 className="text-xl font-semibold text-black-anbu mt-4">{message}</h2>

        {/* Imagen centrada */}
        <div className="flex justify-center my-4">
          <img
            src={jutsuAnbu}
            alt="Jutsu ANBU"
            className="w-40 h-40 object-contain"
          />
        </div>

        {/* Botón "aceptar" */}
        <div className="flex justify-center mt-2">
          <Button
            onClick={() =>  navigate('/homepage')}
            color="bg-black-anbu"
            className="hover:bg-gray-800">
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
