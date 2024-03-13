/* eslint-disable no-control-regex */
import { Form, useNavigate, useLoaderData, useActionData, redirect } from 'react-router-dom'
import { obtenerCliente, actualizarCliente } from '../data/clientes'
import Formulario from '../components/Formulario'
import Error from '../components/Error'

export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteId);

  // Si no hay resultados se muestra un status
  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No hay resultados",
    });
  }
  // Si hay resultados se retorna el cliente
  return cliente;
}

export async function action({request, params}) {
  const formData = await request.formData()
    const datos = Object.fromEntries(formData)
    const email = formData.get('email')

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

  // Se pasa la validacion, entonces se ACTUALIZA el cliente
  await actualizarCliente(params.clienteId, datos)
    return redirect('/')
}

function EditarCliente() {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-sky-700">Editar Cliente</h1>
      <p className="mt-3">
        A continuacion podras modificar los datos del cliente
      </p>

      <div className="flex justify-end">
        <button
          className="bg-sky-700 hover:bg-sky-800 duration-200 text-white px-3 py-1 font-bold uppercase rounded-md"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadouw rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {/* Si errores es truthy */}
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="POST" noValidate>
          <Formulario cliente={cliente} />
          <input
            type="submit"
            className="mt-5 w-full bg-sky-700 uppercase font-bold text-white text-lg rounded py-2 hover:cursor-pointer hover:bg-sky-800 duration-200"
            value="Guardar Cambios"
          />
        </Form>
      </div>
    </>
  );
}

export default EditarCliente;
