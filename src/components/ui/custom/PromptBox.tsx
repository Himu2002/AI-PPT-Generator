import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/react'
import { v4 as uuidv4 } from 'uuid';
import { ArrowUp, Loader2Icon } from 'lucide-react'
import { doc, setDoc } from 'firebase/firestore';
import { firebaseDb } from '../../../../config/FirebaseConfig';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { set } from 'date-fns';

const PromptBox = () => {

    const { user } = useUser()
    const navigate = useNavigate()
    const [userInput, setUserInput] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [noOfSlides, setNoOfSlides] = useState<string>('4 to 6')
    const CreateAndSaveproject = async () => {
        // Save the project in DB
        setLoading(true);
        const projectId = uuidv4();
        try {
            await setDoc(doc(firebaseDb, "projects", projectId), {
                ProjectId: projectId,
                userInputPrompt: userInput,
                cretedBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: Date.now(),
                noOfSlides: noOfSlides
            })
            navigate('/workspace/project/' + projectId + '/outline')
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full flex items-center justify-center mt-28'>
            <div className='flex flex-col items-center justify-center space-y-4'>
                <h2 className='font-bold text-4xl'>Describe your topic, and we'll create <span className='text-primary'>PPT </span>slides</h2>
                <p className='text-xl text-gray-500'>Your design will be saved as new project</p>
                <InputGroup >
                    <InputGroupTextarea
                        placeholder='E.g. "Create a presentation about the benefits of meditation"'
                        className="min-h-36"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    <InputGroupAddon align={'block-end'}>
                        {/* <InputGroupButton >
                            <PlusIcon />
                        </InputGroupButton> */}
                        <Select onValueChange={(value) => setNoOfSlides(value)}>
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Select no. of slides" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>No. of slides</SelectLabel>
                                    <SelectItem value="4 to 6">4 to 6</SelectItem>
                                    <SelectItem value="7 to 9">7 to 9</SelectItem>
                                    <SelectItem value="10 to 12">10 to 12</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputGroupButton
                            variant={'default'}
                            className='rounded-full ml-auto'
                            size={'icon-sm'}
                            onClick={CreateAndSaveproject}
                            disabled={!userInput}>
                            {loading ? <Loader2Icon className='animate-spin' /> :
                                <ArrowUp />}
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </div>
    )
}

export default PromptBox