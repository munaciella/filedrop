"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FileType } from "../../../typings";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";
import { COLOR_EXTENSION_MAP } from "../../../constant";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";

export const columns = (
  setSelectedFile: (file: FileType | null) => void,
  setIsDeleteDialogOpen: (isOpen: boolean) => void,
  setIsRenameDialogOpen: (isOpen: boolean) => void
): ColumnDef<FileType>[] => [
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
    cell: ({ row }) => {
      const file = row.original;
      return (
        <div className="flex items-center space-x-1">
          <span>{file.fileName}</span>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => {
              setSelectedFile(file);
              setIsRenameDialogOpen(true);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      );
    },
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
          className="cursor-pointer"
          onClick={() => {
            setSelectedFile(file); 
            setIsDeleteDialogOpen(true);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      );
    },
  },
];
