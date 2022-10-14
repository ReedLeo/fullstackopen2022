const Notification = ({ msg }) => {
    if (msg === null) {
        return null
    }
    console.log('Notification: ', msg);
    
    if (msg.isErr) {
        return (
            <div className="error">
                {msg.txt}
            </div>
        )
    } else {
        return (
            <div className="notification">
                {msg.txt}
            </div>
        )
    }
}

export default Notification