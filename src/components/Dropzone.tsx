"use client";

import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import DropzoneComponent from "react-dropzone";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "sonner";

const Dropzone = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoaded, isSignedIn, user } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (isLoading) return;
    if (!user) return;
    setIsLoading(true);
  
    const toastId = toast.loading(`Uploading ${selectedFile.name}...`);
  
    try {
      const docRef = await addDoc(collection(db, "users", user.id, "files"), {
        userId: user.id,
        fileName: selectedFile.name,
        fullName: user.fullName,
        profileImg: user.imageUrl,
        timestamp: serverTimestamp(),
        type: selectedFile.type,
        size: selectedFile.size,
      });
  
      const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
      await uploadBytes(imageRef, selectedFile);
  
      const downloadURL = await getDownloadURL(imageRef);
  
      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadURL: downloadURL,
      });
  
      toast.success(`${selectedFile.name} uploaded successfully!`, {
        id: toastId,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
  
      toast.error(`${selectedFile.name} failed to upload!`, {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const maxSize = 20971520;

  return (
    <div className="p-6 sm:p-8">
      <DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragReject,
          fileRejections,
        }) => {
          const isFileTooLarge =
            fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

          return (
            <section>
              <div
                {...getRootProps()}
                className={cn(
                  "w-full h-52 md:h-60 flex justify-center items-center p-6 border border-dashed rounded-lg text-center transition-all duration-200 cursor-pointer",
                  isDragActive
                    ? "bg-blue-500 dark:bg-blue-700 text-white animate-pulse"
                    : "bg-slate-300/70 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                )}
              >
                <input {...getInputProps()} />
                {!isDragActive && "Click here or drop a file to upload"}
                {isDragActive && !isDragReject && "Drop to upload the file!"}
                {isDragReject && "File type not accepted, sorry!"}
                {isFileTooLarge && (
                  <div className="text-red-500 mt-2">File is too large!</div>
                )}
              </div>
            </section>
          );
        }}
      </DropzoneComponent>
    </div>
  );
};

export default Dropzone;

