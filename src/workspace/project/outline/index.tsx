import { firebaseDb } from '../../../../config/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SlidersStyle from '@/components/ui/custom/SlidersStyle';
import OutlineSection from '@/components/ui/custom/OutlineSection';

type Project = {
    ProjectId: string,
    userInputPrompt: string,
    cretedBy: string,
    createdAt: number,
    noOfSlides: string
};


function Outline() {
    const { projectId } = useParams();
    const [projectDetail, setProjectDetail] = useState<Project | null>();

    useEffect(() => {
        console.log(projectDetail);
        projectId && GetProjectDetail();
    }, [projectId, projectDetail])

    const GetProjectDetail = async () => {
        const docref = doc(firebaseDb, "projects", projectId ?? "");
        const docSnap: any = await getDoc(docref);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setProjectDetail(docSnap.data());
        } else {
            console.log("No such document!");
        }
    }
    return (
        <div className='flex justify-center mt-20'>
            <div className='max-w-3xl w-full'>
                <h2 className='font-bold text-2xl'>Settings and Slider Outline</h2>
                <SlidersStyle />
                <OutlineSection />
            </div>
        </div>
    )
}

export default Outline