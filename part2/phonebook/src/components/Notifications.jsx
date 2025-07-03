import './Notification.css'

const Notification = ({message}) => {
    if(message === null) {
        return null
    }

    return (
        <p className={message.type}>{message.content}</p>
    )
}

export default Notification