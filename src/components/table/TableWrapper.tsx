"use client";

import { useUser } from "@clerk/nextjs";
import { FileType } from "../../../typings";
import { Button } from "../ui/button";
import { columns } from "./columns";
import { DataTable } from "./Table";
import { useCallback, useEffect, useState } from "react";
import {
  collection,
  doc,
  orderBy,
  query,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, storage } from "../../../firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { ref, deleteObject } from "firebase/storage";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  const handleDeleteFile = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (fileId: string, fileUrl: string) => {
      if (!user) return;

      const toastId = toast.loading("Deleting file...");

      try {
        await deleteDoc(doc(db, "users", user.id, "files", fileId));

        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
        await deleteObject(fileRef);

        setInitialFiles((prevFiles) =>
          prevFiles.filter((file) => file.id !== fileId)
        );

        toast.success("File deleted successfully", { id: toastId });
      } catch (error) {
        console.error("Error deleting file:", error);
        toast.error("Error deleting file", { id: toastId });
      } finally {
        setIsDeleteDialogOpen(false);
      }
    },
    [user]
  );

  const handleRenameFile = async () => {
    if (!user || !selectedFile || !newFileName.trim()) return;

    const toastId = toast.loading("Renaming file...");

    try {
      const fileRef = doc(db, "users", user.id, "files", selectedFile.id);

      await updateDoc(fileRef, { fileName: newFileName });

      setInitialFiles(prevFiles =>
        prevFiles.map(file =>
          file.id === selectedFile.id ? { ...file, fileName: newFileName } : file
        )
      );

      toast.success("File renamed successfully", { id: toastId });
    } catch (error) {
      console.error("Error renaming file:", error);
      toast.error("Error renaming file", { id: toastId });
    } finally {
      setIsRenameDialogOpen(false);
    }
  };

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
      onDelete: handleDeleteFile,
    }));
    setInitialFiles(files);
  }, [docs, handleDeleteFile]);

  if (docs?.docs.length === undefined) {
    return (
      <div className="flex flex-col">
        <Button variant="outline" className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="h-5 w-full" />
        </Button>

        <div className="border rounded-lg">
          <div className="border-b h-12" />
          {skeletonFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center space-x-4 p-5 w-full"
            >
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

      <DataTable
        columns={columns(setSelectedFile, setIsDeleteDialogOpen, setIsRenameDialogOpen)}
        data={initialFiles}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete{" "}
            <strong>{selectedFile?.fileName}</strong>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                selectedFile &&
                handleDeleteFile(selectedFile.id, selectedFile.downloadURL)
              }
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
          </DialogHeader>
          <p>Current Name: <strong>{selectedFile?.fileName}</strong></p>
          <Input
            type="text"
            placeholder="Enter new file name"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRenameFile}>Confirm Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default TableWrapper;
