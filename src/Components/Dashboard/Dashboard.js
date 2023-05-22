
import "./Dashboard.css"



function Dashboard(props) {


    return (
        <div className="title">
            <div className="total_titles"> <p> Total</p> <hr /> <p> {props.counts.total}</p></div>
            <div className="new_titles"> <p> New</p><hr /> <p> {props.counts.new}</p></div>
            <div className="accepted_titles"> <p> Accepted</p><hr /><p>{props.counts.accepted} </p></div>
            <div className="rejected_titles"> <p> Rejected</p> <hr /> <p>{props.counts.rejected} </p></div>
        </div>
    )
}

export default Dashboard