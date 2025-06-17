import Dropzone from "@/components/Dropzone";
import TableWrapper from "@/components/table/TableWrapper";
import { auth } from "@clerk/nextjs/server";
import { FileType } from "../../../typings";
import { dbAdmin, Timestamp } from "@/lib/firebase-admin";

const DashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const filesSnap = await dbAdmin
    .collection("users")
    .doc(userId)
    .collection("files")
    .get();

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
