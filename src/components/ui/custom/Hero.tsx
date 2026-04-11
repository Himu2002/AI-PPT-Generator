import { Button } from '../button'
import { Link } from 'react-router-dom'
import { useUser, SignInButton, UserButton } from '@clerk/react'
import { Play } from 'lucide-react'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'

const Hero = () => {
    const { user } = useUser()

    return (
        <div className='flex flex-col items-center justify-center mt-28 space-y-4'>
            <h2 className='font-bold text-5xl'>From Idea to <span className='text-primary'>Presentation</span> in Seconds</h2>
            <p className='text-xl text-gray-500 max-w-2xl text-center'>Generate sleek,editable PPTs powered by AI,Save hours on design,focus on your story.</p>
            <div className='flex gap-5 mt-10'>
                <Button variant={'outline'} size={'lg'}>watch Video <Play /></Button>
                {!user ?
                    <SignInButton mode='modal'>
                        <Button size={'lg'}>Get Started</Button>
                    </SignInButton>
                    :
                    <Link to="/workspace">
                        <Button size={'lg'}>Go to Workspace</Button>
                    </Link>
                }
            </div>
            <div className="relative max-w-3xl mt-14">
                <h2 className='text-center my-4'>Watch How to Create AI PPT</h2>
                <HeroVideoDialog
                    className="block dark:hidden"
                    animationStyle="top-in-bottom-out"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                    thumbnailAlt="Hero Video"
                />
                <HeroVideoDialog
                    className="hidden dark:block"
                    animationStyle="top-in-bottom-out"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                    thumbnailAlt="Hero Video"
                />
            </div>
        </div>
    )
}

export default Hero