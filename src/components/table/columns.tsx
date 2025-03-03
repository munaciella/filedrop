// 'use client';

// import { ColumnDef } from "@tanstack/react-table";
// import { FileType } from "../../../typings";
// import prettyBytes from "pretty-bytes";
// import { FileIcon, defaultStyles } from "react-file-icon";
// import { COLOR_EXTENSION_MAP } from "../../../constant";

// export const columns: ColumnDef<FileType>[] = [
//     {
//         accessorKey: "type",
//         header: "Type",
//         cell: ({ renderValue }) => {
//             const type = renderValue() as string
//             const extension: string = type.split("/")[1]
//             return (
//                 <div className="w-10">
//                     <FileIcon
//                     extension={extension}
//                     labelColor={COLOR_EXTENSION_MAP[extension]}
//                     // @ts-expect-error ts(2322)
//                     {...defaultStyles[extension]}
//                     />
//                 </div>
//             )
//         },
//     },
//     {
//         accessorKey: "fileName",  // ✅ Fixed: Should be "fileName" (not "filename")
//         header: "File Name",
//     },
//     {
//         accessorKey: "timestamp",
//         header: "Date Added",
//     },
//     {
//         accessorKey: "size",
//         header: "Size",
//         cell: ({ renderValue }) => {
//             return <span>{prettyBytes(renderValue() as number)}</span>;
//         },
//     },
//     {
//         accessorKey: "downloadURL",
//         header: "Link",
//         cell: ({ renderValue }) => {
//             return (  // ✅ Fixed: Added "return" statement
//                 <a
//                     href={renderValue() as string}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="underline text-blue-500 hover:text-blue-600"
//                 >
//                     Download
//                 </a>
//             );
//         },
//     },
// ];



// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { FileType } from "../../../typings";
// import prettyBytes from "pretty-bytes";
// import { FileIcon, defaultStyles } from "react-file-icon";
// import { COLOR_EXTENSION_MAP } from "../../../constant";

// // ✅ Function to format date (e.g., "02 Mar 2025 at 16:00")
// const formatDate = (date: Date | undefined) => {
//   if (!date) return "N/A";
//   return new Intl.DateTimeFormat("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(date).replace(",", " at");
// };

// export const columns: ColumnDef<FileType>[] = [
//   {
//     accessorKey: "type",
//     header: "Type",
//     cell: ({ renderValue }) => {
//       const type = renderValue() as string;
//       const extension: string = type.split("/")[1];
//       return (
//         <div className="w-10">
//           <FileIcon
//             extension={extension}
//             labelColor={COLOR_EXTENSION_MAP[extension]}
//             // @ts-expect-error ts(2322)
//             {...defaultStyles[extension]}
//           />
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "fileName",
//     header: "File Name",
//     cell: ({ renderValue }) => (
//       <span className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] md:max-w-none">
//         {renderValue() as string}
//       </span>
//     ),
//   },
//   {
//     accessorKey: "timestamp",
//     header: "Date Added",
//     cell: ({ renderValue }) => {
//       return <span className="whitespace-nowrap">{formatDate(renderValue() as Date)}</span>;
//     },
//   },
//   {
//     accessorKey: "size",
//     header: "Size",
//     cell: ({ renderValue }) => {
//       const roundedSize = Math.ceil(renderValue() as number);
//       return <span>{prettyBytes(roundedSize)}</span>;
//     },
//   },
//   {
//     accessorKey: "downloadURL",
//     header: "Link",
//     cell: ({ renderValue }) => {
//       return (
//         <a
//           href={renderValue() as string}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="underline text-blue-500 hover:text-blue-600 whitespace-nowrap"
//         >
//           Download
//         </a>
//       );
//     },
//   },
// ];



"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FileType } from "../../../typings";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";
import { COLOR_EXTENSION_MAP } from "../../../constant";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue }) => {
      const type = renderValue() as string;
      const extension: string = type.split("/")[1];
      return (
        <div className="w-10">
          <FileIcon
            extension={extension}
            labelColor={COLOR_EXTENSION_MAP[extension]}
            // @ts-expect-error ts(2322)
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "fileName",
    header: "File Name",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
    cell: ({ renderValue }) => {
      const timestamp = renderValue() as Date;
      return (
        <span>
          {timestamp.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}{" "}
          at{" "}
          {timestamp.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadURL",
    header: "Link",
    cell: ({ renderValue }) => {
      return (
        <a
          href={renderValue() as string}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-500 hover:text-blue-600"
        >
          Download
        </a>
      );
    },
  },
  {
    id: "delete",
    header: "Delete",
    cell: ({ row }) => {
      const file = row.original;
      return (
        <Button
          variant="destructive"
          size="icon"
          onClick={() => file.onDelete(file.id, file.downloadURL)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      );
    },
  },
];
