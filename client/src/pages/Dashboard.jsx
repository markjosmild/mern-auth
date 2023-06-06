import { useContext } from "react"
import { UserContext } from '../../context/userContext'

export default function Dashboard() {
    const {user} = useContext(UserContext)

    return (
        <div>
             <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
            {!!user && (<p className="text-white text-lg">Welcome to your dashboard {user.username}!</p>)} 
        </div>
    )
}
