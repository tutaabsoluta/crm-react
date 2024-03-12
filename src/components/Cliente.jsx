/* eslint-disable react/prop-types */


function Cliente({cliente}) {

    const { nombre, empresa, email, telefono, id } = cliente
  return (
    <tr className="border-b">
      <p className="text-xl text-gray-800 text-center">{nombre}</p>
      <p className="text-center">{empresa}</p>
    
      <td className="p-6">
        <p className="text-gray-600 text-center"><span className="text-gray-800 font-bold">Email: </span>{email}</p>
        <p className="text-gray-600 text-center"><span className="text-gray-800 font-bold">Tel: </span>{telefono}</p>
      </td>


      <td className="p-6 md:flex md:items-center md:justify-evenly">
        <button 
        type="button"
        className="text-sky-600 hover:text-sky-800 uppercase font-bold text-xs"
        >
          Editar
        </button>

        <button 
        type="button"
        className="text-red-600 hover:text-red-800 uppercase font-bold text-xs"
        >
          Eliminar
        </button>
      </td>


    </tr>

  );
}

export default Cliente