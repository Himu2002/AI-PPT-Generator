// import { firebaseDb } from '../../../../config/FirebaseConfig';
// import { deleteField, doc, getDoc, setDoc } from "firebase/firestore";
// import { use, useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import type { Project } from "../outline";

// function Editor() {

//     const { projectId } = useParams();
//     const [projectDetail, setProjectDetail] = useState<Project>();


//     const GetProjectDetail = async () => {
//         const docref = doc(firebaseDb, "projects", projectId ?? "");
//         const docSnap: any = await getDoc(docref);

//         if (!docSnap.exists()) {
//             return;
//         }
//         const projectData = docSnap.data();
//         console.log(projectData);
//         setProjectDetail(projectData);
//     }

//     return (
//         <div className="grid grid-cols-5 p-10">
//             <div className="col-span-2">
//                 {/* Outlines */}
//                 {/* <OutlineSection /> */}
//             </div>
//             <div className="col-span-3">
//                 {/* Slides */}
//                 Slides
//             </div>
//         </div>
//     )
// }

// export default Editor

