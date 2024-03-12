import { useNavigate, Form } from "react-router-dom";
import Formulario from "../components/Formulario";

export function action() {
  console.log('Enviando...');
  return null
}

function NuevoCliente() {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="font-black text-4xl text-sky-700">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
      </p>

      <div className="flex justify-end">
        <button
          className="bg-sky-700 hover:bg-sky-800 duration-200 text-white px-3 py-1 font-bold uppercase rounded-md"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadouw rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        <Form 
          method="POST"
        >
          <Formulario />
          <input
            type="submit"
            className="mt-5 w-full bg-sky-700 uppercase font-bold text-white text-lg rounded py-2 hover:cursor-pointer hover:bg-sky-800 duration-200"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  );
}

// useNavigate permite redireccionar dentro de botobes
// Redirect es ideal en Loaders y en Actions

export default NuevoCliente

