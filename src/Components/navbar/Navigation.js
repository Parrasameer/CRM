import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import "./Navigation.css"

function Navigation() {
    const navigate = useNavigate()
    // const { login } = useParams()
    const [login, setLogin] = useState(false)


    useEffect(() => {

        const value = localStorage.getItem("isLoggedIn")
        if (value && value === "true") {
            setLogin(true)
        }

    }, [])
    function Signin() {
        navigate("/signin")

    }

    function Signup() {
        navigate("/signup")

    }
    function logout() {
        localStorage.removeItem("isLoggedIn")
        navigate("/signin")

    }
    function homebtn() {
        navigate("/")

    }
    function userBtn() {
        navigate("/user")

    }
    function ticket() {
        navigate("/ticket")
    }

    return (
        <div className="Container navbar">
            <div>
                <button className="btn btn-info home" onClick={homebtn}>Home </button>
                <button className="btn btn-primary home" onClick={userBtn}>User </button>
                <button className="btn btn-success home" onClick={ticket}>Ticket </button>

                {!login && <div>
                    <button onClick={Signin} className="btn btn-primary  sign"> Sign in</button>
                    <button onClick={Signup} className="btn btn-primary  sign"> Sign up</button>
                </div>}
                {login && <div>
                    <button onClick={logout} className="btn btn-danger sign"> Logout</button> </div>}
            </div>
        </div>
    )
}
export default Navigation