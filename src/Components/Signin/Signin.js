import "./Signin.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


function Signin() {
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const [signIn, setSignIn] = useState({})
    function login(e) {
        e.preventDefault()

        fetch(process.env.REACT_APP_APIURL + "user/signin", {
            method: "POST",
            body: JSON.stringify(signIn),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {

                if (!signIn.email && !signIn.password) {
                    setMessage("Please Enter Email and password ")
                    return
                }
                if (!signIn.email) {
                    setMessage("Please Enter Email ")
                    return
                }
                if (!signIn.password) {
                    setMessage("Please Enter password ")
                    return
                }
                if (res.ok) {
                    localStorage.setItem("isLoggedIn", "true")
                    navigate("/")
                }
                else {

                    setMessage("invalid credational")

                }
            })


    }
    return (
        <div className="signin">
            <div className="left">
                <img src="https://img.freepik.com/premium-vector/crm-icons-customer-relationship-management-vector-infographics-template_116137-3703.jpg"></img>
            </div>
            <div className="right">
                <div className="signin">
                    <form className="container " onSubmit={login}>
                        <h4> Sign In</h4> <hr />
                        {message && <p className="alert alert-danger" role="alert"> {message}</p>}
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                            <input onChange={(e) => {
                                signIn.email = e.target.value
                                setSignIn(signIn)
                            }} type="email" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input onChange={(e) => {
                                signIn.password = e.target.value
                                setSignIn(signIn)
                            }} type="password" className="form-control" id="exampleInputPassword1" />
                        </div>


                        <button className="btn btn-success float-end"> log In</button>
                        {/* <p className="anchor"> Don't have a account ! <a href="/signup">Sign up</a></p> */}
                    </form>


                </div>
            </div>
        </div>
    )
}
export default Signin