import { Link } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import { Button } from '../button'
import { useUser, SignInButton, UserButton } from '@clerk/react'

const Header = () => {
    const { user } = useUser()
    return (
        <div className='flex items-center justify-between px-10 shadow'>
            <img src={logo} alt="Logo" width={130} height={130} />
            {!user ?
                <SignInButton mode='modal'>
                    <Button>Get Started</Button>
                </SignInButton>
                : <div className='flex gap-5 items-center'>
                    <UserButton />
                    <Link to="/workspace">
                        <Button>Go to Workspace</Button>
                    </Link>
                </div>
            }
        </div>
    )
}

export default Header