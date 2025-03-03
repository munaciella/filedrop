export type FileType = {
    id: string;
    fileName: string;
    fullName: string;
    timestamp: Date;
    downloadURL: string;
    type: string;
    size: number;
    onDelete?: (fileId: string, fileUrl: string) => void;
}