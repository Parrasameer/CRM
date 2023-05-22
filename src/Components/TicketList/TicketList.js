import Navigation from "../navbar/Navigation";
import { useEffect, useState } from "react";
import "./TicketList.css"
import { useNavigate } from "react-router-dom";
import TicketDashboard from "../Dashboard/TicketDashboard";

function TicketList() {
    const [tickets, setTickets] = useState([])
    const [searchtickets, setSearchTickets] = useState([])
    const [ticketCount, setTicketCount] = useState({})

    const navigate = useNavigate()
    useEffect(() => {
        fetch("http://localhost:4000/api/ticket")
            .then(res => res.json())
            .then(res => {
                setTickets(res)
                setSearchTickets(res)
                let newCounts = res.filter(c => c.status === "New").length;
                let completedCounts = res.filter(c => c.status === "Completed").length;
                let inProgressCounts = res.filter(c => c.status === "In Progress").length;
                let assigned = res.filter(c => c.status === "Assigned").length;
                let countObj = {
                    "new": newCounts,
                    "completed": completedCounts,
                    "inProgress": inProgressCounts,
                    "assigned": assigned,

                    "total": res.length
                }
                setTicketCount(countObj)


            })

    }, [])
    function handleTicket() {
        navigate("/ticketForm")

    }
    function handleEdit(name) {
        navigate("/ticketForm/" + name)
    }
    function handleTicketSearch(e) {
        console.log(e)
        console.log(tickets)
        if (!e || e.length === 0) {
            setSearchTickets(tickets)
        }
        else {
            const result = tickets.filter(c => c.desc.includes(e));

            setSearchTickets(result)
        }
    }
    return (
        <div>
            <Navigation />
            <TicketDashboard counts={ticketCount} />
            <div className="container">
                <div className="flex">
                    <button className="btn btn-primary" onClick={handleTicket}> Create new ticket</button>
                    <div className="search-wrapper">

                        <input onInput={(e) => {
                            handleTicketSearch(e.target.value)
                        }}
                            className="search-box" type="search" placeholder="Search" aria-label="Search" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>



                    </div>
                </div>
                <table className=" table  table-dark table-striped">

                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>

                            <th scope="col">Assigned To</th>
                            <th scope="col">Status</th>
                            <th colspan="2" scope="col">Raised On</th>
                        </tr>
                    </thead>

                    {searchtickets.map((e, i) => (
                        <tbody className=" table  table-dark table-striped">
                            <tr>
                                <td > {i + 1}</td>
                                <td > {e.customer}</td>
                                <td > {e.desc}</td>
                                <td > {e.assignedTo}</td>
                                <td >{e.status}</td>
                                <td > {e.raisedOn}</td>
                                <td > <button onClick={() => {
                                    handleEdit(e.desc)
                                }} className="btn btn-success"> Edit</button></td>
                            </tr>
                        </tbody>
                    ))}

                </table>
            </div>
        </div>
    )
}
export default TicketList