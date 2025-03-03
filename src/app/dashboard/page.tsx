// import Dropzone from "@/components/Dropzone"
// import { auth } from "@clerk/nextjs/server" 
// import { collection, getDocs } from "firebase/firestore"
// import { db } from "../../../firebase"
// import { FileType } from "../../../typings"
// import TableWrapper from "@/components/table/TableWrapper"

// const DashboardPage = async () => {
//   const { userId } = await auth()
//   if (!userId) return null

//   const docsResults = await getDocs(collection(db, "users", userId!, "files"));
// const skeletonFiles: FileType[] = docsResults.docs.map(doc => ({
//   id: doc.id,
//   fileName: doc.data().fileName || doc.id,
//   timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
//   fullName: doc.data().fullName,
//   downloadURL: doc.data().downloadURL,
//   type: doc.data().type,
//   size: doc.data().size,
// }));

// //console.log("Fetched Firestore Data:", skeletonFiles); // ✅ Debugging step


//   return (
//     <div className=" items-center p-5 py-5 lg:py-8">
//       <Dropzone />

//       <div className="flex flex-col items-center" >
//       <section className="container space-y-5 flex flex-col px-4 md:px-8 lg:px-12 p-5">
//         <h2 className="font-bold text-lg md:text-xl lg:text-2xl">
//           All Files
//         </h2>

//         <div className="w-full">
//           <TableWrapper  skeletonFiles={skeletonFiles} />
//         </div>
//       </section>
//       </div>
//     </div>
//   )
// }

// export default DashboardPage


import Dropzone from "@/components/Dropzone";
import { auth } from "@clerk/nextjs/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { FileType } from "../../../typings";
import TableWrapper from "@/components/table/TableWrapper";

const DashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const docsResults = await getDocs(collection(db, "users", userId!, "files"));
  const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
    id: doc.id,
    fileName: doc.data().fileName || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <Dropzone />

      <div className="flex flex-col items-center">
        <section className="container space-y-5 flex flex-col px-4 md:px-8 lg:px-12 p-6">
          <h2 className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900 dark:text-white">
            All Files
          </h2>

          {/* 🔹 File Table - Ensures proper spacing on mobile */}
          <div className="w-full">
            <TableWrapper skeletonFiles={skeletonFiles} />
          </div>
        </section>
      </div>
    </div>
  );
};
export default DashboardPage;
