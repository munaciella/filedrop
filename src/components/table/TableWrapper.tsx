/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";

// import { useUser } from "@clerk/nextjs";
// import { FileType } from "../../../typings";
// import { Button } from "../ui/button";
// import { columns } from "./columns";
// import { DataTable } from "./Table";
// import { useEffect, useState } from "react";
// import { collection, orderBy, query } from "firebase/firestore";
// import { useCollection } from "react-firebase-hooks/firestore";
// import { db } from "../../../firebase";
// import { Skeleton } from "@/components/ui/skeleton";

// const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
//   const { user } = useUser();
//   const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
//   const [sort, setSort] = useState<"asc" | "desc">("desc");

//   const [docs, loading, error] = useCollection(
//     user &&
//       query(
//         collection(db, "users", user.id, "files"),
//         orderBy("timestamp", sort)
//       )
//   );

//   useEffect(() => {
//     if (!docs) return;
//     const files: FileType[] = docs.docs.map((doc) => ({
//       id: doc.id,
//       fileName: doc.data().fileName,
//       timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
//       fullName: doc.data().fullName,
//       downloadURL: doc.data().downloadURL,
//       type: doc.data().type,
//       size: doc.data().size,
//     }));
//     setInitialFiles(files);
//   }, [docs]);

//   if (docs?.docs.length === undefined) {
//     return (
//       <div className="flex flex-col">
//         <Button variant="outline" className="ml-auto w-36 h-10 mb-5">
//           <Skeleton className="h-5 w-full" />
//         </Button>

//         <div className="border rounded-lg">
//         <div className="border-b h-12" />
//         {skeletonFiles.map((file) => (
//           <div
//             key={file.id}
//             className="flex items-center space-x-4 p-5 w-full"
//           >
//             <Skeleton className="h-12 w-12" />
//             <Skeleton className="h-12 w-full" />
//           </div>
//         ))}

//         {skeletonFiles.length === 0 && (
//           <div className="flex items-center space-x-4 p-5 w-full">
//             <Skeleton className="h-12 w-12" />
//             <Skeleton className="h-12 w-full" />
//           </div>
//         )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col space-y-5 pb-10">
//       <Button
//         variant="outline"
//         onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
//         className="ml-auto w-fit"
//       >
//         Sort By {sort === "desc" ? "Newest" : "Oldest"}
//       </Button>

//       <DataTable columns={columns} data={initialFiles} />
//     </div>
//   );
// };

// export default TableWrapper;



// "use client";

// import { useUser } from "@clerk/nextjs";
// import { FileType } from "../../../typings";
// import { Button } from "../ui/button";
// import { columns } from "./columns";
// import { DataTable } from "./Table";
// import { useEffect, useState } from "react";
// import { collection, orderBy, query } from "firebase/firestore";
// import { useCollection } from "react-firebase-hooks/firestore";
// import { db } from "../../../firebase";
// import { Skeleton } from "@/components/ui/skeleton";

// const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
//   const { user } = useUser();
//   const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
//   const [sort, setSort] = useState<"asc" | "desc">("desc");

//   const [docs, loading, error] = useCollection(
//     user &&
//       query(
//         collection(db, "users", user.id, "files"),
//         orderBy("timestamp", sort)
//       )
//   );

//   useEffect(() => {
//     if (!docs) return;
//     const files: FileType[] = docs.docs.map((doc) => ({
//       id: doc.id,
//       fileName: doc.data().fileName,
//       timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
//       fullName: doc.data().fullName,
//       downloadURL: doc.data().downloadURL,
//       type: doc.data().type,
//       size: doc.data().size,
//     }));
//     setInitialFiles(files);
//   }, [docs]);

//   if (docs?.docs.length === undefined) {
//     return (
//       <div className="flex flex-col">
//         <Button variant="outline" className="ml-auto w-36 h-10 mb-5">
//           <Skeleton className="h-5 w-full" />
//         </Button>

//         <div className="border rounded-lg p-4">
//           <div className="border-b h-12 mb-4" />
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {skeletonFiles.map((file) => (
//               <div
//                 key={file.id}
//                 className="flex items-center space-x-4 p-5 w-full"
//               >
//                 <Skeleton className="h-12 w-12 rounded-md" />
//                 <Skeleton className="h-12 w-full" />
//               </div>
//             ))}

//             {skeletonFiles.length === 0 && (
//               <div className="flex items-center space-x-4 p-5 w-full">
//                 <Skeleton className="h-12 w-12 rounded-md" />
//                 <Skeleton className="h-12 w-full" />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col space-y-5 pb-10">
//       <Button
//         variant="outline"
//         onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
//         className="ml-auto w-fit"
//       >
//         Sort By {sort === "desc" ? "Newest" : "Oldest"}
//       </Button>

//       {/* ✅ Ensures table fits on small screens */}
//       <div className="w-full max-w-full">
//         <DataTable columns={columns} data={initialFiles} />
//       </div>
//     </div>
//   );
// };

// export default TableWrapper;



"use client";

import { useUser } from "@clerk/nextjs";
import { FileType } from "../../../typings";
import { Button } from "../ui/button";
import { columns } from "./columns";
import { DataTable } from "./Table";
import { useCallback, useEffect, useState } from "react";
import { collection, doc, orderBy, query, deleteDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, storage } from "../../../firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { ref, deleteObject } from "firebase/storage";

const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  // ✅ Define `handleDeleteFile` inside `useCallback`
  const handleDeleteFile = useCallback(async (fileId: string, fileUrl: string) => {
    if (!user) return;

    try {
      // 1️⃣ Delete from Firestore
      await deleteDoc(doc(db, "users", user.id, "files", fileId));

      // 2️⃣ Delete from Firebase Storage
      const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
      await deleteObject(fileRef);

      // 3️⃣ Update the state to remove the deleted file
      setInitialFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));

    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }, [user]);

  useEffect(() => {
    if (!docs) return;
    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      fileName: doc.data().fileName,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      fullName: doc.data().fullName,
      downloadURL: doc.data().downloadURL,
      type: doc.data().type,
      size: doc.data().size,
      onDelete: handleDeleteFile, // Pass the delete function to the column
    }));
    setInitialFiles(files);
  }, [docs, handleDeleteFile]);

//   const handleDeleteFile = async (fileId: string, fileUrl: string) => {
//     if (!user) return;

//     try {
//       // 1️⃣ Delete from Firestore
//       await deleteDoc(doc(db, "users", user.id, "files", fileId));

//       // 2️⃣ Delete from Firebase Storage
//       const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
//       await deleteObject(fileRef);

//       // 3️⃣ Update the state to remove the deleted file
//       setInitialFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));

//       console.log(`Deleted file: ${fileId}`);
//     } catch (error) {
//       console.error("Error deleting file:", error);
//     }
//   };

  if (docs?.docs.length === undefined) {
    return (
      <div className="flex flex-col">
        <Button variant="outline" className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="h-5 w-full" />
        </Button>

        <div className="border rounded-lg">
          <div className="border-b h-12" />
          {skeletonFiles.map((file) => (
            <div key={file.id} className="flex items-center space-x-4 p-5 w-full">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}

          {skeletonFiles.length === 0 && (
            <div className="flex items-center space-x-4 p-5 w-full">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        variant="outline"
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
        className="ml-auto w-fit"
      >
        Sort By {sort === "desc" ? "Newest" : "Oldest"}
      </Button>

      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
};

export default TableWrapper;
