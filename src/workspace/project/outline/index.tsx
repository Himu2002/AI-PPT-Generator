import { firebaseDb, GeminiAiModel } from '../../../../config/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SlidersStyle from '@/components/ui/custom/SlidersStyle';
import OutlineSection from '@/components/ui/custom/OutlineSection';

// export type Outline = {
//     slideNo: string,
//     slidePoint: string,
//     outline: string
// }

type Project = {
    ProjectId: string,
    userInputPrompt: string,
    cretedBy: string,
    createdAt: number,
    noOfSliders: string,
    outline: any
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

    useEffect(() => {
        projectId && GetProjectDetail();
    }, [projectId])

    const GetProjectDetail = async () => {
        const docref = doc(firebaseDb, "projects", projectId ?? "");
        const docSnap: any = await getDoc(docref);

        if (!docSnap.exists()) {
            return;
        }

        const projectData = docSnap.data() as Project;
        console.log(projectData);

        if (Array.isArray(projectData?.outline)) {
            console.log('```json');
            console.log(JSON.stringify(projectData.outline, null, 2));
        }

        if (!projectData?.outline) {
            GenerateSlidersOutline(projectData);
        }
    }

    const GenerateSlidersOutline = async (ProjectData: Project) => {
        setLoading(true);
        const prompt = OUTLINE_PROMPT
            .replace("{userInput}", ProjectData?.userInputPrompt)
            .replace("{noOfSliders}", ProjectData?.noOfSliders);

        const result = await GeminiAiModel.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        console.log(text);
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

