import { Link, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/react'
import { Button } from '../components/ui/button'

const Workspace = () => {
    const { user } = useUser()

    if (!user) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <p>Please sign in to access the workspace.</p>
                <Link to="/">
                    <Button>Sign In</Button>
                </Link>
            </div>
        )
    }

    return (
        <div>
            Workspace
            <Outlet />
        </div>
    )
}

export default Workspace