import './TicketDashboard.css'
function TicketDashboard(props) {


    return (
        <div className="title">
            <div className="total_titles"> <p> Total</p> <hr /> <p> {props.counts.total}</p></div>
            <div className="new_titles"> <p> New</p><hr /> <p> {props.counts.new}</p></div>
            <div className="completed_titles"> <p> Completed</p><hr /><p>{props.counts.completed} </p></div>
            <div className="inProgress_titles"> <p> In Progress</p> <hr /> <p>{props.counts.inProgress} </p></div>
            <div className="assigned_titles"> <p> Assigned</p> <hr /> <p>{props.counts.assigned} </p></div>
        </div>
    )
}

export default TicketDashboard