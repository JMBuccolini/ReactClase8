import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import axios from 'axios';
import { useEffect, useState } from "react";


const CrudApp = () => {

    const [db, setDb] = useState()
    const [dataToEdit, setDataToEdit] = useState(null);
    const [loading, setLoading] = useState(false);


    const getData = async () => {
        const res = await axios.get("http://localhost:5000/santos"),
            json = await res.data
        setDb(json)
    }
    useEffect(() => {
        setLoading(true);
        getData()
        setLoading(false);
    }, []);





    const createData = async (data) => {
        data.id = Date.now();

        await axios.post("http://localhost:5000/santos",data)

        getData()
    };


    const updateData = async (data) => {
        let endpoint = `http://localhost:5000/santos/${data.id}`;

        let options = {
            method: "PUT",
            headers: { "content-type": "application/json" },
            data: JSON.stringify(data)
        }
        await axios(endpoint, options)

        getData()
    };



    const deleteData = async (id) => {
        let isDelete = window.confirm(
            `Estás seguro que deseas eliminar el registro "${id}"?`
        );

        if (isDelete) {
            let endpoint = `http://localhost:5000/santos/${id}`;

            let options = {
                method: "DELETE",
                headers: { "content-type": "application/json" },
            }
            await axios(endpoint, options)

            getData()
        } else {
            return;
        }
    };






    return (
        <div>
            <h2>CRUD App</h2>


            <CrudForm
                createData={createData}
                updateData={updateData}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}

            />
            {loading && <Loader />}

            {db && (
                <CrudTable
                    data={db}
                    setDataToEdit={setDataToEdit}
                    deleteData={deleteData}
                />
            )}

        </div>
    )
}

export default CrudApp
