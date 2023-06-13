import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Signup.css"
function Signup() {
    const navigate = useNavigate()
    const [sign, setSign] = useState({})
    function signUp(e) {
        e.preventDefault()
        fetch(process.env.REACT_APP_APIURL + "user/signup", {
            method: "POST",
            body: JSON.stringify(sign),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    navigate("/signin")
                }

            })
            .catch((e) => {
                console.log(e)
            })


    }
    return (
        <div className=" signup">
            <div className="left">
                <img src="https://img.freepik.com/premium-vector/crm-icons-customer-relationship-management-vector-infographics-template_116137-3703.jpg"></img>
            </div>
            <div className="right">
                <form className="container " >
                    <h4> Please Register to get started.</h4> <hr />
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                        <input onInput={(e) => {
                            setSign({ ...sign, name: e.target.value })
                        }} type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                        <input onInput={(e) => {
                            setSign({ ...sign, email: e.target.value })
                        }} type="email" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onInput={(e) => {
                            setSign({ ...sign, password: e.target.value })
                        }} type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button onClick={signUp} className="btn btn-success float-end"> Register</button>
                    <a className="anchor" href="/signin"> Already have a account ? </a>
                </form>
            </div>
        </div>
    )
}
export default Signup