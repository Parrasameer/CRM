
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";


function SecuredRoutes(props) {
    const [login, setLogin] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const isUserLogged = localStorage.getItem("isLoggedIn");
        if (!isUserLogged || isUserLogged !== "true") {
            navigate("/signin")
        }
        else {
            setLogin(true)
        }
    }, [])
    return (
        <React.Fragment>
            {login ? props.children : null}
        </React.Fragment>
    )

}


export default SecuredRoutes