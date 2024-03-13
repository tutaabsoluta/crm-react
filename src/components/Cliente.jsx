/* eslint-disable react/prop-types */
import { useNavigate, Form, redirect } from "react-router-dom";
import { eliminarCliente } from "../data/clientes";

export async function action({ params }) {
  await eliminarCliente(params.clienteId);
  return redirect("/");
}

function Cliente({ cliente }) {
  const navigate = useNavigate();
  const { nombre, empresa, email, telefono, id } = cliente;

  return (
    <tr className="border-b">
      <td className="p-6">
        <p className="text-xl text-gray-800 text-center">{nombre}</p>
        <p className="text-center">{empresa}</p>
      </td>
      <td className="p-6">
        <p className="text-gray-600 text-center">
          <span className="text-gray-800 font-bold">Email: </span>
          {email}
        </p>
        <p className="text-gray-600 text-center">
          <span className="text-gray-800 font-bold">Tel: </span>
          {telefono}
        </p>
      </td>
      <td className="p-6 md:flex md:items-center md:justify-evenly">
        <button
          type="button"
          className="text-sky-600 hover:text-sky-800 uppercase font-bold text-xs"
          onClick={() => navigate(`/clientes/${id}/editar`)}
        >
          Editar
        </button>
        <Form
          method="POST"
          action={`/clientes/${id}/eliminar`}
          onSubmit={(e) => {
            if (!confirm("Deseas eliminar este registro?")) {
              e.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="text-red-600 hover:text-red-800 uppercase font-bold text-xs"
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
}

export default Cliente;
