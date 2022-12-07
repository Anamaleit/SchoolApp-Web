import { useEffect } from "react"
import { useAnnouncementsContext } from "../hooks/useAnnouncementsContext"

//components
import AnnouncementDetails from '../components/AnnouncementDetails'

//Modal
import AnnouncementModal from "../components/Modal/AnnouncementModal"


const Home = () => {
    const {announcements, dispatch} = useAnnouncementsContext() 

    useEffect(() => {
        const fetchAnnouncements = async () => {
            const response = await fetch('/api/announcements')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_ANNOUNCEMENTS', payload: json})
            }
        }
        fetchAnnouncements()
    }, [dispatch])


    return (
        <div className="home">
            <AnnouncementModal />
            <div className="announcements">
                {announcements && announcements.map((announcement) => (
                    <AnnouncementDetails key={announcement._id} announcement={announcement} />
                ))}
            </div>
        </div>
    )
}

export default Home