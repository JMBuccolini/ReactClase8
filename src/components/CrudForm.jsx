import { useState, useEffect } from "react"


const initialForm = {
    name: "",
    lastname: "",
    id: null
}


const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {

    const [form, setForm] = useState(initialForm)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.lastname) {
            alert("Datos incompletos");
            return;
        }
        if (form.id === null) {
            createData(form);
        } else {
            updateData(form);
        }
        handleReset();
    }
    const handleReset = (e) => {
        setForm(initialForm);
        setDataToEdit(null);
    }

    useEffect(() => {
        if (dataToEdit) {
          setForm(dataToEdit)
        } else {
          setForm(initialForm)
        }
      }, [dataToEdit])
    




    return (
        <div>
            <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre" onChange={handleChange} value={form.name} />
                <input type="text" name="lastname" placeholder="Lastname"
                    onChange={handleChange} value={form.lastname}
                />
                <input type="submit" value="Enviar" />
                <input type="reset" value="Limpiar" onClick={handleReset} />
            </form>
        </div>
    )
}

export default CrudForm
