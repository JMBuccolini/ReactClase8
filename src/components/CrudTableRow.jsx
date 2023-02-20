



const CrudTableRow = ({ caballero, setDataToEdit, deleteData }) => {

    let { name, constellation, id } = caballero;



    return (
        <tr>
            <td>{name}</td>
            <td>{constellation}</td>
            <td>
                <button onClick={() => setDataToEdit(caballero)}>Editar</button>
                <button onClick={() => deleteData(id,name)}>Eliminar</button>
            </td>
        </tr>


    )
}

export default CrudTableRow
