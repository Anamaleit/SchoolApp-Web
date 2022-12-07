const AnnouncementDetails = ({ announcement }) => {
    return (
        <div className="announcement-details">
            <div className="announcement-header">
                <div className="title">{announcement.title}</div>
                <div className="time">{announcement.createdAt}</div>
            </div>
            <div className="announcement-content">
                <p><strong></strong>{announcement.description}</p>
            </div>
        </div>
    )
}

export default AnnouncementDetails