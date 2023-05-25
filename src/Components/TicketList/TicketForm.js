import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Navigation from "../navbar/Navigation"
import { Dropdown } from 'primereact/dropdown';
function TicketForm() {
    const [customer, setCustomer] = useState([])
    const [assigned, setAssigned] = useState([])
    const [userData, setData] = useState({})
    const [valueMissing, setValueMissing] = useState(false)
    const navigate = useNavigate()
    const { name } = useParams()
    const [read, setRead] = useState(false)
    const [disable, setDisable] = useState(false)




    useEffect(() => {


        fetch("http://localhost:4000/api/customer")
            .then(res => res.json())
            .then(res => {
                setCustomer(res)



            });
        fetch("http://localhost:4000/api/user")
            .then(res => res.json())
            .then(res => {
                setAssigned(res)



            })
        if (name) {
            setRead(true);
            setDisable(true);
            fetch('http://localhost:4000/api/ticket/' + name)
                .then((res) => res.json())
                .then((res) => {

                    setData(res)

                })

        }

    }, [])

    function handleTicketForm(e) {
        e.preventDefault()
        console.log(userData)
        if (!userData.status) {
            return setValueMissing(true)


        }

        fetch("http://localhost:4000/api/ticket", {
            method: name ? "PUT" : "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {

            navigate("/ticket")
            return res.json()
        })

    }



    return (
        <div>
            <Navigation />

            <div className="container">
                {valueMissing && <div class="alert alert-danger" role="alert">
                    Alert ! Please Select a status
                </div>}
                <form onSubmit={handleTicketForm} >
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Name</label>
                        {/* <select value={userData.customer} disabled={disable} className="form-select" onChange={(e) => {
                            let obj = { ...userData }
                            obj.customer = e.target.value
                            setData(obj)
                        }} >
                            <option> Select option</option>
                            {
                                customer.map((el) => {
                                    return <option value={el.name}> {el.name}</option>
                                })
                            }



                        </select> */}
                        <br />

                        <Dropdown disabled={read}

                            value={
                                customer.find(c => c.name == userData.customer)
                            } onChange={(e) => {
                                let obj = { ...userData }
                                obj.customer = e.value.name
                                setData(obj)
                            }} options={customer} optionLabel="name" placeholder="Select a Customer"
                            filter className="w-full" />

                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Description</label>
                        <input value={userData.desc} onChange={(e) => {
                            setData({
                                ...userData,
                                desc: e.target.value
                            })
                        }} type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Assigned To</label>
                        <select value={userData.assignedTo} className="form-select" onChange={(e) => {
                            setData({
                                ...userData,
                                assignedTo: e.target.value
                            })
                        }}  >  <option> Select option</option>
                            {assigned.map((el) => (
                                <option value={el.name}> {el.name}</option>
                            ))}</select>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Status</label>
                        <select value={userData.status} className="form-select" onChange={(e) => {
                            setData({
                                ...userData,
                                status: e.target.value
                            })
                        }}><option  > Select Option</option>
                            <option value="New" > New</option>
                            <option value="In Progress" > In progress</option>
                            <option value="Assigned" > Assigned</option>
                            <option value="Completed" > Completed</option>

                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label"> Raised On</label>
                        <input value={userData.raisedOn} readOnly={read} onChange={(e) => {
                            let obj = { ...userData }
                            obj.raisedOn = e.target.value
                            setData(obj)
                        }} type="date" className="form-control" id="exampleInputPassword1" />
                    </div>
                    {!name && <button className="btn btn-primary float-end" > Create Ticket</button>}
                    {name && <button className="btn btn-primary float-end" > Update Ticket</button>}
                </form>
            </div>
        </div>
    )
}

export default TicketForm