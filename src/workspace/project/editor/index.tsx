import { firebaseDb, GeminiAiliveModel } from '../../../../config/FirebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Project } from '../outline';
import OutlineSection from '@/components/ui/custom/OutlineSection';

const SLIDER_PROMPT = `" Generate HTML (TailwindCSS + Flowbite UI + Lucide Icons) 
code for a 16:9 Modern Dark style. 
{DESIGN_STYLE}. responsive design 16:9 layout, 
and Flowbite component structure. Use different 
different layout depends on content and style. 
use color from tailwindcss like primary accent, 
gradient and background and any other 
if needed and use this color {COLORS_CODE}. 
MetaData for Slider : {METADATA}, 
Generate Image if needed and use Image as 'https://ik.imagekit.io/ikmedia/ik-genimg-prompt-{imagePrompt}/{altImageName}.jpg'. Replace {imagePrompt} with relavant image prompt and altImageName with random image name for that image. 16:9 ratio. PPT Slider. Just give me body content only.`


function Editor() {

    const { projectId } = useParams();
    const [projectDetail, setProjectDetail] = useState<Project | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        projectId && GetProjectDetail();
    }, [projectId])

    const GetProjectDetail = async () => {
        setLoading(true);
        const docref = doc(firebaseDb, "projects", projectId ?? "");
        const docSnap: any = await getDoc(docref);

        if (!docSnap.exists()) {
            setLoading(false);
            return;
        }
        const projectData = docSnap.data();
        console.log(projectData);
        setProjectDetail(projectData);
        setLoading(false);
    }

    useEffect(() => {
        if (projectDetail && projectDetail?.slides?.length) {
            GenerateSlides();
        }
    }, [projectDetail])

    const GenerateSlides = async () => {
        const prompt = SLIDER_PROMPT.replace("{DESIGN_STYLE}", projectDetail?.designStyle?.designGuide || "")
            .replace("{COLORS_CODE}", JSON.stringify(projectDetail?.designStyle?.colors) || "")
            .replace("{METADATA}", JSON.stringify(projectDetail?.outline[0] || []));

        const session = await GeminiAiliveModel.connect();

        session.send(prompt);

        let text = "";
        const messages = session.receive();
        for await (const message of messages) {
            switch (message.type) {
                case "serverContent":
                    if (message.turnComplete) {
                        console.log(text);
                    } else {
                        const parts = message.modelTurn?.parts;
                        if (parts) {
                            text += parts.map((part: any) => part?.text ?? "").join("");
                            console.log(text);
                        }
                    }
                    break;
                case "toolCall":
                    break;
                case "toolCallCancellation":
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <div className="grid grid-cols-5 p-10">
            <div className="col-span-2 h-screen overflow-auto">
                {/* Outlines */}
                <OutlineSection outline={projectDetail?.outline || []}
                    handleUpdateOutline={() => console.log()}
                    loading={loading} />
            </div>
            <div className="col-span-3">
                {/* Slides */}
                Slides
            </div>
        </div>
    )
}

export default Editor

