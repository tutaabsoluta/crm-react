/* eslint-disable no-control-regex */
import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";

export async function action({ request }) {
  // El objeto formData contiene toda la informacion del formulario
  const formData = await request.formData();

  const datos = Object.fromEntries(formData);

  const email = formData.get("email");

  // Validacion
  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!regex.test(email)) {
    errores.push("El email no es valido");
  }
  // Retornar datos si hay errores
  if (Object.keys(errores).length) {
    return errores;
  }

  await agregarCliente(datos);
  return redirect("/");
}

function NuevoCliente() {
  const errores = useActionData();
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
        {/* Si errores es truthy */}
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="POST" noValidate>
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

// Redireccionar a otras URLs:
// useNavigate permite redireccionar dentro de botones
// Redirect es ideal en Loaders y en Actions

export default NuevoCliente;
