import { useAnnouncementsContext } from '../hooks/useAnnouncementsContext'
import { useAuthContext } from '../hooks/useAuthContext'

import AnnouncementModal from "./Modal/AnnouncementModal"

// date fns
import { format } from 'date-fns'

const AnnouncementDetails = ({ announcement }) => {
    const { dispatch } = useAnnouncementsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        
        const response = await fetch ('api/announcements/' + announcement._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
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
                <div className="time">{format(new Date(announcement.createdAt), 'dd-MMM-yy , hh:mm')}</div>
            </div>
            <div className="announcement-content">
                <p><strong></strong>{announcement.description}</p>
            </div>
            <div className='user-id' style={{margin: '20px'}}>created by {user.email}</div>
            <AnnouncementModal mode="update" announcement={announcement} className="announcement-update-button"/>
            <br/>
            <button className="delete-button" onClick={handleClick}>Delete</button>
        </div>
    )
}

export default AnnouncementDetails