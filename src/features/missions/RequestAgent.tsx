import { useState } from "react";
import { useNavigate } from "react-router-dom";
import maskAnbu from "../../assets/ilustrations/Mascara_png-removebg-preview.png";
import Popup from "../../components/Popup";
import { Button } from "../../components/ui";
import Header from "../../components/mission/Header";

function RequestAgent() {
  const [formData, setFormData] = useState({
    alias: "",
    correo: "",
  });
  const navigate = useNavigate();
  const [errores, setErrores] = useState<{ [key: string]: string }>({});
  const [modalVisible, setModalVisible] = useState(false);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosErrores: { [key: string]: string } = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) nuevosErrores[key] = "Este campo es obligatorio";
    });

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      setModalVisible(true);
      setFormData({
        alias: "",
        correo: "",
      });
    }
  };

  return (
    <div className="bg-black-anbu flex min-h-screen flex-col items-center p-4 text-white">
      <div className="bg-grayBlue-anbu w-full max-w-3xl rounded-xl shadow-md">
        <Header />

        <form onSubmit={manejarEnvio} className="grid gap-6 p-6 md:grid-cols-2">
          <div className="flex items-center justify-center">
            <img src={maskAnbu} alt="ANBU Mask" className="h-70 w-70" />
          </div>

          <div className="flex flex-col gap-4">
            {/** Campos del formulario */}
            {["alias", "correo"].map((campo) => (
              <div key={campo}>
                <label className="mb-1 block capitalize">{campo}</label>
                <input
                  name={campo}
                  type={
                    campo === "correo"
                      ? "email"
                      : campo === "password"
                        ? "password"
                        : "text"
                  }
                  value={(formData as any)[campo]}
                  onChange={manejarCambio}
                  className="text-black-anbu w-full rounded bg-gray-100 px-3 py-2"
                />
                {errores[campo] && (
                  <p className="text-sm text-red-400">{errores[campo]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="col-span-2 mt-4 flex justify-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              type="button"
              color="bg-red-anbu"
              className="hover:bg-gray2-anbu"
            >
              Volver
            </Button>

            <Button
              type="submit"
              color="bg-red-anbu"
              className="hover:bg-green-anbu"
            >
              Enviar Solicitud
            </Button>
          </div>
        </form>
      </div>

      {/* Modal de éxito */}
      <Popup
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        message="¡Creación exitosa!"
      />
    </div>
  );
}

export default RequestAgent;
