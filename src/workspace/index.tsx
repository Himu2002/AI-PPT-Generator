import { Outlet, useLocation } from 'react-router-dom'
import { SignInButton, useUser } from '@clerk/react'
import { Button } from '../components/ui/button'
import { firebaseDb } from '../../config/FirebaseConfig'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useContext } from 'react';
import { UserDetailContext } from '../../context/UserDetailContext';
import Header from '@/components/ui/custom/Header';
import PromptBox from '@/components/ui/custom/PromptBox';
import MyProjects from '@/components/ui/custom/MyProjects';

const Workspace = () => {
    const { user, isLoaded } = useUser()
    const [, setUserDetails] = useContext(UserDetailContext);
    const location = useLocation()
    // Create a new user profile when someone logs in
    useEffect(() => {
        user && createNewUser();
    }, [user])

    const createNewUser = async () => {
        if (user) {
            // Check if the user is already saved in our database
            const docRef = doc(firebaseDb, "users", user?.primaryEmailAddress?.emailAddress ?? "");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setUserDetails(docSnap.data());
            } else {
                // If this is a new user, save their details with some free credits
                const data = {
                    fullName: user?.fullName,
                    email: user?.primaryEmailAddress?.emailAddress,
                    createdAt: new Date(),
                    credits: 2
                }

                await setDoc(doc(firebaseDb, "users", user.primaryEmailAddress?.emailAddress ?? ""), {
                    ...data
                });
                setUserDetails(data);
            }
        }
    }

    // If the user isn't logged in, show a friendly message to sign in
    if (!user && isLoaded) {
        return (
            <div>
                <Header />
                <div className='flex items-center justify-center h-[calc(100vh-130px)]'>
                    <p className="mr-4 text-lg">Please sign in to access the workspace.</p>
                    <SignInButton mode="modal">
                        <Button>Sign In</Button>
                    </SignInButton>
                </div>
            </div>
        )
    }

    // If the user is logged in, show them the header and the main content
    return (
        <div>
            <Header />
            {location.pathname === '/workspace' &&
                <div>
                    <PromptBox />
                    <MyProjects />
                </div>}
            <Outlet />
        </div>
    )
}

export default Workspace
