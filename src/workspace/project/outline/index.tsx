import { firebaseDb, GeminiAiModel } from '../../../../config/FirebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import SlidersStyle, { type DesignStyle } from '@/components/ui/custom/SlidersStyle';
import OutlineSection from '@/components/ui/custom/OutlineSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2Icon } from 'lucide-react';
import { set } from 'date-fns';

export type Outline = {
    slideNo: string,
    slidePoint: string,
    outline: string
}

type Project = {
    userInputPrompt: string,
    ProjectId: string,
    createdAt: number,
    noOfSliders: string,
    outline: Outline[]
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

const DUMMY_OUTLINE: Outline[] = [
    {
        slideNo: "1",
        slidePoint: "Welcome",
        outline: "Introduction to Hello and what this presentation will cover."
    },
    {
        slideNo: "2",
        slidePoint: "Agenda",
        outline: "Overview of the main sections and learning goals for this presentation."
    },
    {
        slideNo: "3",
        slidePoint: "Hello - Key Point 1",
        outline: "Core explanation, practical example, and key takeaway for this section."
    },
    {
        slideNo: "4",
        slidePoint: "Hello - Key Point 2",
        outline: "Core explanation, practical example, and key takeaway for this section."
    },
    {
        slideNo: "5",
        slidePoint: "Thank You",
        outline: "Summary of important points, final thoughts, and a closing thank-you message."
    }
]


function Outline() {
    const { projectId } = useParams();
    const [loading, setLoading] = useState(false);
    const fetchedProjectIdRef = useRef<string | null>(null);
    const [projectDetail, setProjectDetail] = useState<Project | null>(null);
    const [outline, setOutline] = useState<Outline[]>(DUMMY_OUTLINE);
    const [selectedStyle, setSelectedStyle] = useState<DesignStyle>();
    const [UpdateDbLoading, setUpdateDbLoading] = useState(false);

    useEffect(() => {
        if (!projectId || fetchedProjectIdRef.current === projectId) {
            return;
        }

        fetchedProjectIdRef.current = projectId;
        GetProjectDetail();
    }, [projectId])

    const LogFormattedOutline = (rawOutline: any) => {
        const orderedOutline = Array.isArray(rawOutline)
            ? rawOutline.map(({ slideNo, slidePoint, outline }: any) => ({ slideNo, slidePoint, outline }))
            : [{ slideNo: rawOutline?.slideNo, slidePoint: rawOutline?.slidePoint, outline: rawOutline?.outline }];

        console.log('```json');
        console.log(JSON.stringify(orderedOutline, null, 2));
    }

    const GetProjectDetail = async () => {
        const docref = doc(firebaseDb, "projects", projectId ?? "");
        const docSnap: any = await getDoc(docref);

        if (!docSnap.exists()) {
            return;
        }

        const projectData = docSnap.data();
        setProjectDetail(projectData);

        if (Array.isArray(projectData?.outline) && projectData.outline.length > 0) {
            LogFormattedOutline(projectData.outline);
            return;
        }

        //GenerateSlidersOutline(projectData);
    }

    const GenerateSlidersOutline = async (ProjectData: Project) => {
        setLoading(true);
        const prompt = OUTLINE_PROMPT
            .replace("{userInput}", ProjectData?.userInputPrompt)
            .replace("{noOfSliders}", ProjectData?.noOfSliders);

        const result = await GeminiAiModel.generateContent(prompt);

        const response = result.response;
        const text = response.text();


        try {
            const rawJson = text.replace(/```json|```/g, '').trim();
            const JSONData = JSON.parse(rawJson);
            LogFormattedOutline(JSONData);
            setOutline(JSONData);
        } catch {
            // Fallback to raw model output if parsing fails.
            console.log(text);
        }

        setLoading(false);
    }

    const handleUpdateOutline = (index: string, value: Outline) => {
        setOutline((prev) =>
            prev.map((item) =>
                item.slideNo === index ? { ...item, ...value } : item
            )
        );
    }

    const onGenerateSlider = async () => {
        setUpdateDbLoading(true);
        //Update DB
        await setDoc(doc(firebaseDb, "projects", projectId ?? ""), {
            designStyle: selectedStyle,
            outline: outline
        }, {
            merge: true
        });
        setUpdateDbLoading(false);

    }
    return (
        <div className='flex justify-center mt-20'>
            <div className='max-w-3xl w-full'>
                <h2 className='font-bold text-2xl'>Settings and Slider Outline</h2>
                <SlidersStyle selectStyle={(value: DesignStyle) => setSelectedStyle(value)} />
                <OutlineSection loading={loading} outline={outline || []}
                    handleUpdateOutline={(index: string, value: Outline) => handleUpdateOutline(index, value)} />
            </div>
            <Button size={'lg'} className='fixed bottom-6
            transform left-1/2 -translate-x-1/2'
                onClick={onGenerateSlider}
                disabled={UpdateDbLoading || loading || !selectedStyle}>
                {UpdateDbLoading && <Loader2Icon className='animate-spin' />}
                Generate Sliders<ArrowRight />
            </Button>
        </div>
    )
}



export default Outline

