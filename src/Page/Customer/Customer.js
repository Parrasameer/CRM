import "./Customer.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Components/navbar/Navigation";
import Dashboard from "../../Components/Dashboard/Dashboard";

function Customer() {
    // const { login } = useParams()
    const navigate = useNavigate()
    const [customer, setCustomer] = useState([]);
    const [filterCustomer, setFilterCustomer] = useState([])
    const [data, setData] = useState([])
    const [login, setLogin] = useState(false)
    const [counts, setCounts] = useState({})
    const [page, setPage] = useState([])
    const [lastPage, setLastPage] = useState(0)


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



    const [pageNo, setPageNo] = useState(1)

    useEffect(() => {
        fetch('http://localhost:4000/api/customer/page/' + pageNo)
            .then(res => res.json())
            .then(res => {


                setFilterCustomer(res.records)
                setCustomer(res.records)

                let newCounts = res.records.filter(c => c.status === "New").length;
                let acceptedCounts = res.records.filter(c => c.status === "Accepted").length;
                let rejectedCounts = res.records.filter(c => c.status === "Rejected").length;
                let countObj = {
                    "new": newCounts,
                    "accepted": acceptedCounts,
                    "rejected": rejectedCounts,
                    "total": res.records.length
                }
                setCounts(countObj)

                let totalPages = Math.ceil(res.totalCount / 100)
                setLastPage(totalPages)

                let arrayOfPages = new Array(totalPages).fill(0)
                setPage(arrayOfPages)



            })
    }, [data])
    function handleCustomerClick() {
        navigate("/form")
    }
    function handleCustomerUpdate(name) {
        navigate("/form/" + name)
    }
    function handleDelete(name) {



        fetch("http://localhost:4000/api/customer/" + name, {
            method: "DELETE",


        })
            .then(res => res.json())
            .then(res => {
                setData([])
            })
        // .then(() => {
        //     fetch('http://localhost:4000/api/customer')
        //         .then(res => res.json())
        //         .then(res => {
        //             setCustomer(res)



        //         })
        // })


    }
    function handleSearch(key) {
        if (!key || key.length === 0) {
            setFilterCustomer(customer)
        }
        else {
            const result = customer.filter(c => c.name.includes(key))
            setFilterCustomer(result)
        }

    }

    return (
        <div>
            <Navigation />
            <div className="container">
                <Dashboard counts={counts} />

                <div >
                    <button className="btn btn-primary   " onClick={handleCustomerClick} > Create new Customer</button>
                    <nav className="navbar navbar-light bg-light float-end ">
                        <form className="form-inline  ">
                            <input onInput={(e) => {
                                handleSearch(e.target.value)
                            }} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />

                        </form>

                    </nav>
                </div>
                {filterCustomer.length > 0 && <table className="table table-dark table-striped ">
                    <thead>
                        <tr>
                            <th colSpan="9" className="Header"> CUSTOMER DETAILS</th>
                        </tr>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Revenue</th>
                            <th scope="col">No of Employess</th>
                            <th scope="col">CEO</th>
                            <th scope="col">Established Year</th>

                            <th colSpan="2" scope="col"></th>
                        </tr>

                    </thead>

                    {
                        filterCustomer.map((el, index) => (



                            <tbody className="table table-striped container grey">
                                <tr >
                                    <td className='colmn1' > {++index}</td>
                                    <td className='colmn2'> {el.name}</td>
                                    <td className="colmn ">{el.status === "New" && <p className="new">  New</p>}
                                        {el.status === "Accepted" && <p className="accepted" > Accepted</p>}
                                        {el.status === "Rejected" && <p className="rejected"> Rejected</p>}</td>

                                    <td className='colmn'> {el.turnover}</td>
                                    <td className='colmn'> {el.employees}</td>
                                    <td className='colmn'> {el.ceo}</td>
                                    <td className='colmn'> {el.year}</td>

                                    <td> {login && <button onClick={() => {
                                        handleCustomerUpdate(el.name)
                                    }} className="btn btn-success" > Update</button>}</td>
                                    <td>  {login && <button onClick={() => {

                                        handleDelete(el.name)


                                    }} className="btn btn-warning"> Delete</button>}</td>
                                </tr>

                            </tbody>

                        ))
                    }

                </table>}
                {customer.length === 0 && <div> <p className="alert alert-primary" role="alert"> NOTHING TO DISPLAY</p></div>}

            </div>
            <nav className="Page" aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><button onClick={
                        () => {
                            if (pageNo === 1) { return }
                            else {
                                setPageNo(pageNo - 1)
                                setData([])
                            }


                        }
                    } className="page-link" >Previous</button></li>
                    {page.map((p, index) => {
                        return <li className="page-item"><button className="page-link" onClick={() => {
                            setPageNo(index + 1)
                            setData([])
                        }}>{index + 1}</button></li>

                    })}
                    <li className="page-item"><button onClick={
                        () => {

                            if (pageNo >= lastPage) { return }
                            else {
                                setPageNo(pageNo + 1)
                                setData([])
                            }


                        }} className="page-link" >Next</button></li>
                </ul>
            </nav>
            {!login && <h2> SORRY  YOU NEED TO LOGIN INORDER TO VIST HOME PAGE</h2>}
        </div>
    )
}
export default Customer