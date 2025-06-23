import closeIcono from '../assets/icons/cancel-svgrepo-com.svg';

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-3 right-3 text-black-anbu transition cursor-pointer"

      
      aria-label="Cerrar"
    >
      <img src={closeIcono} alt="Cerrar" className="w-4 h-4" />

    </button>
  );
};

export default CloseButton;
