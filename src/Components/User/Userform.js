

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../navbar/Navigation';

function Userfrom() {
    const navigate = useNavigate()


    const [userData, setData] = useState({});


    //const [customerUpdate, setCustomerUpdate] = useState({})
    // useParams allows us to access route parameter ..




    function handleEvent(e) {
        e.preventDefault()

        fetch("http://localhost:4000/api/user/signup", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            navigate("/user")
            return res.json()
        })


    }



    return (
        <div>
            <Navigation />
            <form className='container' onSubmit={handleEvent}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Name</label>
                    <input



                        type="text" onInput={(e) => {
                            let obj = { ...userData }
                            obj.name = e.target.value
                            setData(obj)

                        }} value={userData.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                </div>

                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">UserName</label>
                    <input value={userData.username} onChange={(e) => {
                        let obj = { ...userData }
                        obj.username = e.target.value
                        setData(obj)
                    }} type="text" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input value={userData.password} onChange={(e) => {
                        let obj = { ...userData }
                        obj.password = e.target.value
                        setData(obj)
                    }} type="text" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">email</label>
                    <input value={userData.email} onChange={(e) => {
                        let obj = { ...userData }
                        obj.email = e.target.value
                        setData(obj)
                    }} type="text" className="form-control" id="exampleInputPassword1" />
                </div>
                <div class="form-check">
                    <input onChange={(e) => {
                        let obj = { ...userData }
                        obj.isActive = e.target.checked
                        setData(obj)
                    }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" for="flexCheckDefault">
                        isACTIVE
                    </label>
                </div>
                {<button type="submit" className='btn btn-primary float-end'>Create new user</button>}
            </form>
        </div>
    )
}

export default Userfrom