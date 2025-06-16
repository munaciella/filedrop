// import Dropzone from "@/components/Dropzone";
// import { auth } from "@clerk/nextjs/server";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../lib/firebase";
// import { FileType } from "../../../typings";
// import TableWrapper from "@/components/table/TableWrapper";

// const DashboardPage = async () => {
//   const { userId } = await auth();
//   if (!userId) return null;

//   const docsResults = await getDocs(collection(db, "users", userId!, "files"));
//   const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
//     id: doc.id,
//     fileName: doc.data().fileName || doc.id,
//     timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
//     fullName: doc.data().fullName,
//     downloadURL: doc.data().downloadURL,
//     type: doc.data().type,
//     size: doc.data().size,
//   }));

//   return (
//     <div className="p-6 md:p-8 lg:p-10">
//       <Dropzone />

//       <div className="flex flex-col items-center">
//         <section className="container space-y-5 flex flex-col px-4 md:px-8 lg:px-12 p-6">
//           <h2 className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900 dark:text-white">
//             All Files
//           </h2>

//           <div className="w-full">
//             <TableWrapper skeletonFiles={skeletonFiles} />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };
// export default DashboardPage;

// src/app/dashboard/page.tsx
import Dropzone from "@/components/Dropzone";
import TableWrapper from "@/components/table/TableWrapper";
import { auth } from "@clerk/nextjs/server";
import { FileType } from "../../../typings";
import { dbAdmin, Timestamp } from "@/lib/firebase-admin";

const DashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  // 1) Fetch via Admin SDK under the authenticated user's path
  const filesSnap = await dbAdmin
    .collection("users")
    .doc(userId)
    .collection("files")
    .get();

  // 2) Map to your FileType
  const skeletonFiles: FileType[] = filesSnap.docs.map((doc) => {
    const data = doc.data();
    const rawTs = data.timestamp as Timestamp | undefined;
    const timestamp: Date = rawTs?.toDate() ?? new Date();

    return {
      id: doc.id,
      fileName: data.fileName || doc.id,
      timestamp,
      fullName: data.fullName,
      downloadURL: data.downloadURL,
      type: data.type,
      size: data.size,
    };
  });

  // 3) Render
  return (
    <div className="p-6 md:p-8 lg:p-10">
      <Dropzone />

      <div className="flex flex-col items-center">
        <section className="container space-y-5 flex flex-col px-4 md:px-8 lg:px-12 p-6">
          <h2 className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900 dark:text-white">
            All Files
          </h2>

          <div className="w-full">
            <TableWrapper skeletonFiles={skeletonFiles} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
