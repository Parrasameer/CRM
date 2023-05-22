import "./User.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Components/navbar/Navigation";
import { Button } from "bootstrap";
import "./User.css"

function User() {
    // const { login } = useParams()
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const [login, setLogin] = useState(false)

    // // here we are checking are we logged in or not
    // const isLogged = localStorage.getItem("isLoggedIn")
    // if (!isLogged || isLogged !== "true") {
    //     navigate("/signin")


    // }





    useEffect(() => {

        const value = localStorage.getItem("isLoggedIn")
        if (value && value === "true") {

            setLogin(true)
        }

    }, [])





    useEffect(() => {
        fetch('http://localhost:4000/api/user')
            .then(res => res.json())
            .then(res => {
                setUsers(res)
                console.log(res)



            })
    }, [])
    function handleCustomerClick() {
        navigate("/userForm")
    }


    // .then(() => {
    //     fetch('http://localhost:4000/api/customer')
    //         .then(res => res.json())
    //         .then(res => {
    //             setCustomer(res)



    //         })
    // })
    function Activate(username) {

        fetch("http://localhost:4000/api/user/activate/" + username, {
            method: "PUT",

        }
        ).then(res => res.json())
            .then(res => setUsers(res))

    }
    function Deactivate(username) {
        fetch("http://localhost:4000/api/user/deActivate/" + username, {
            method: "PUT",

        }).then(res => res.json())
            .then(res => setUsers(res))
    }



    return (
        <div>
            <Navigation />
            <div className="container">


                {login && <button className="btn btn-primary   " onClick={handleCustomerClick} > Create new user</button>}
                {users.length > 0 && <table className="table table-dark table-striped ">
                    <thead>
                        <tr>
                            <th colSpan="8" className="Header"> USER DETAILS</th>
                        </tr>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">USERNAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">PASSWORD</th>
                            <th scope="col">isACTIVE</th>

                        </tr>

                    </thead>

                    {
                        users.map((el, index) => (




                            <tbody className="users table table-dark table-striped container">
                                <tr >
                                    <td className='colmn1' > {++index}</td>
                                    <td className='colmn2'> {el.name}</td>

                                    <td className='colmn'> {el.username}</td>
                                    <td className='colmn'> {el.email}</td>
                                    <td className='colmn'> {el.password}</td>
                                    <td className='colmn'> {el.isActive && <button onClick={() => {
                                        Deactivate(el.username)
                                    }} className="btn btn-danger"> Deactivate</button>}
                                        {!el.isActive && <button onClick={() => {
                                            Activate(el.username)
                                        }} className="btn btn-success"> Activate</button>} </td>


                                </tr>

                            </tbody>

                        ))
                    }

                </table>}
                {users.length === 0 && <div> <p className="alert alert-primary" role="alert"> NOTHING TO DISPLAY</p></div>}

            </div>

        </div>
    )
}
export default User