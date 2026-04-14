import { firebaseDb, GeminiAiModel } from '../../../../config/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import SlidersStyle from '@/components/ui/custom/SlidersStyle';
import OutlineSection from '@/components/ui/custom/OutlineSection';

type Project = {
    ProjectId: string,
    userInputPrompt: string,
    cretedBy: string,
    createdAt: number,
    noOfSliders: string,
    outline: any[]
};

const OUTLINE_PROMPT = `Generate a PowerPoint slide outline for the topic {userInput}. Create {noOfSliders} slides in total. 
Each slide should include a topic name and a 2-line descriptive outline that clearly explains what content the slide will cover.
Include the following structure:
The first slide should be a Welcome screen.
The second slide should be an Agenda screen.
The final slide should be a Thank You screen.
Return the response only in JSON format, following this schema:
[
 {
 "slideNo": "",
 "slidePoint": "",
 "outline": ""
 }
]`


function Outline() {
    const { projectId } = useParams();
    const [loading, setLoading] = useState(false);
    const requestedProjectIdRef = useRef<string | null>(null);

    useEffect(() => {
        if (!projectId) return;
        if (requestedProjectIdRef.current === projectId) return;
        requestedProjectIdRef.current = projectId;
        void GetProjectDetail();
    }, [projectId])

    const GetProjectDetail = async () => {
        const docref = doc(firebaseDb, "projects", projectId ?? "");
        const docSnap: any = await getDoc(docref);

        if (docSnap.exists()) {
            if (docSnap.data()?.outline?.length) {
                return;
            }
            GenerateSlidersOutline(docSnap.data());
        }
    }

    const GenerateSlidersOutline = async (ProjectData: Project) => {
        setLoading(true);
        // Provide a prompt that contains text
        const prompt = OUTLINE_PROMPT
            .replace("{userInput}", ProjectData.userInputPrompt ?? "")
            .replace("{noOfSliders}", ProjectData.noOfSliders ?? "5");

        // To generate text output, call generateContent with the text input
        const result = await GeminiAiModel.generateContent(prompt);

        const response = result.response;
        response.text();
        setLoading(false);
    }

    return (
        <div className='flex justify-center mt-20'>
            <div className='max-w-3xl w-full'>
                <h2 className='font-bold text-2xl'>Settings and Slider Outline</h2>
                <SlidersStyle />
                <OutlineSection loading={loading} />
            </div>
        </div>
    )
}

export default Outline