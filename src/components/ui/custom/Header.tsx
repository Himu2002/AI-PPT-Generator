import { Link, useLocation } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import { Button } from '../button'
import { useUser, SignInButton, UserButton } from '@clerk/react'
import { UserDetailContext } from '../../../../context/UserDetailContext'
import { useContext } from 'react'
import { Gem } from 'lucide-react'

const Header = () => {
    // Get the current user details
    const { user } = useUser()
    const location = useLocation()
    const [userDetails] = useContext(UserDetailContext)

    console.log(location.pathname)

    return (
        <div className='flex items-center justify-between p-4 px-10 shadow'>
            <div className='flex-1'>
                <img src={logo} alt="Logo" width={150} height={150} />
            </div>

            <div className='hidden md:flex flex-1 justify-center gap-10 text-lg font-medium'>
                <Link to={'/workspace'} className='hover:text-primary transition-colors'>Workspace</Link>
                <Link to={'/pricing'} className='hover:text-primary transition-colors'>Pricing</Link>
            </div>

            <div className='flex-1 flex justify-end'>
                {/* Show "Get Started" if the user is not logged in, otherwise show their profile and workspace button */}
                {!user ?
                    <SignInButton mode='modal'>
                        <Button className='text-xl px-8 py-6'>Get Started</Button>
                    </SignInButton>
                    : <div className='flex gap-5 items-center'>
                        <UserButton appearance={{ elements: { avatarBox: { width: 48, height: 48 } } }} />
                        {location.pathname.includes('/workspace') ?
                            <div className='flex gap-2 items-center p-3 px-5 text-xl bg-primary/10 text-primary rounded-lg'>
                                <Gem className='w-7 h-7' /> {userDetails?.credits ?? 0}
                            </div> :
                            <Link to='/workspace'>
                                <Button className='text-xl px-8 py-6'>Go to Workspace</Button>
                            </Link>}
                    </div>}
            </div>
        </div>
    )
}

export default Header