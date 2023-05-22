import './CustomerForm.css'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../../navbar/Navigation';

function CustomerForm() {
    const navigate = useNavigate()


    const [userData, setData] = useState({});


    //const [customerUpdate, setCustomerUpdate] = useState({})
    // useParams allows us to access route parameter ..
    const { name } = useParams()
    const [readOnly, setReadOnly] = useState(false);
    useEffect(() => {

        if (name) {
            setReadOnly(true);
        } else {
            // If the input is empty, allow the user to edit it
            setReadOnly(false);
        }
    }, [])

    useEffect(() => {
        if (name) {
            fetch('http://localhost:4000/api/customer/' + name)
                .then(res => res.json())
                .then((res) => {

                    setData(res)

                })
        }
    }, [])
    function handleEvent(e) {
        e.preventDefault()


        fetch("http://localhost:4000/api/customer", {
            method: name ? "PUT" : "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            navigate("/")
            return res.json()
        })


    }
    function handleUpdate(e) {
        e.preventDefault()


        fetch("http://localhost:4000/api/customer", {
            method: "PUT",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            navigate("/")
            return res.json()
        })


    }



    return (
        <div>
            <Navigation />
            <form className='container' onSubmit={handleEvent}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Name</label>
                    <input readOnly={readOnly}



                        type="text" onInput={(e) => {
                            let obj = { ...userData }
                            obj.name = e.target.value
                            setData(obj)

                        }} value={userData.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                </div>

                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Revenue</label>
                    <input value={userData.turnover} onChange={(e) => {
                        let obj = { ...userData }
                        obj.turnover = e.target.value
                        setData(obj)
                    }} type="number" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">No of Employes</label>
                    <input value={userData.employees} onChange={(e) => {
                        let obj = { ...userData }
                        obj.employees = e.target.value
                        setData(obj)
                    }} type="number" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">CEO</label>
                    <input value={userData.ceo} onChange={(e) => {
                        let obj = { ...userData }
                        obj.ceo = e.target.value
                        setData(obj)
                    }} type="text" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Established Year</label>
                    <input value={userData.year} onChange={(e) => {
                        let obj = { ...userData }
                        obj.year = e.target.value
                        setData(obj)
                    }} type="Number" className="form-control" id="exampleInputPassword1" />
                </div>
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text" for="inputGroupSelect01">Status</label>
                        </div>
                        <select onChange={(e) => {
                            let obj = { ...userData }
                            obj.status = e.target.value
                            setData(obj)
                        }} className="custom-select" id="inputGroupSelect01">

                            <option value="New">New</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                {!name && <button type="submit" className='btn btn-primary float-end'>Create new Customer</button>}
                {name && <button onClick={handleUpdate} className='btn btn-primary float-end'>Update</button>} </form>
        </div>
    )
}

export default CustomerForm