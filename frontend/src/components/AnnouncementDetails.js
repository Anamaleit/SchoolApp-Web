import { useAnnouncementsContext } from '../hooks/useAnnouncementsContext'

const AnnouncementDetails = ({ announcement }) => {
    const { dispatch } = useAnnouncementsContext()

    const handleClick = async () => {
        const response = await fetch ('api/announcements/' + announcement._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_ANNOUNCEMENT', payload:json})
        }
    }


    return (
        <div className="announcement-details">
            <div className="announcement-header">
                <div className="title">{announcement.title}</div>
                <div className="time">{announcement.createdAt}</div>
            </div>
            <div className="announcement-content">
                <p><strong></strong>{announcement.description}</p>
            </div>
            <button className="delete-button" onClick={handleClick}>Delete</button>
        </div>
    )
}

export default AnnouncementDetails