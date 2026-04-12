import { firebaseDb } from '../../../../config/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

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
        projectId && GetProjectDetail();
    }, [projectId])

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
        <div>Outline</div>
    )
}

export default Outline