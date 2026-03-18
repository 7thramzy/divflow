"use client";

import { useRef, useState } from "react";
import { api } from "@/lib/api";
import { MediaItem } from "@/lib/types";
import { Paperclip, Trash2, Upload, FileText, Image, File } from "lucide-react";

interface MediaUploaderProps {
  modelType: "projects" | "tasks" | "internal-notes";
  modelId: number;
  media: MediaItem[];
  onMediaChange: (media: MediaItem[]) => void;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon({ mimeType }: { mimeType: string }) {
  if (mimeType.startsWith("image/")) return <Image className="h-4 w-4 text-primary" />;
  if (mimeType === "application/pdf") return <FileText className="h-4 w-4 text-red-500" />;
  return <File className="h-4 w-4 text-gray-500" />;
}

export default function MediaUploader({ modelType, modelId, media, onMediaChange }: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("files[]", file));
      const res = await api.post(`/${modelType}/${modelId}/media`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onMediaChange([...media, ...res.data.data]);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const deleteMedia = async (mediaId: number) => {
    try {
      await api.delete(`/media/${mediaId}`);
      onMediaChange(media.filter((m) => m.id !== mediaId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-5 text-center transition-colors cursor-pointer
          ${dragOver
            ? "border-primary bg-primary-light dark:bg-primary-light/10"
            : "border-gray-300 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50"
          }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); uploadFiles(e.dataTransfer.files); }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => uploadFiles(e.target.files)}
        />
        <Upload className="mx-auto h-7 w-7 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {uploading ? "جاري الرفع..." : "اسحب الملفات هنا أو انقر للاختيار"}
        </p>
        <p className="text-xs text-gray-400 mt-1">الحد الأقصى 20 ميجابايت لكل ملف</p>
      </div>

      {/* File list */}
      {media.length > 0 && (
        <ul className="divide-y divide-gray-100 dark:divide-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {media.map((item) => (
            <li key={item.id} className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[var(--card)] hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
              <FileIcon mimeType={item.mime_type} />
              <div className="flex-1 min-w-0">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-900 dark:text-white truncate hover:text-primary dark:hover:text-accent transition-colors block"
                >
                  {item.file_name}
                </a>
                <span className="text-xs text-gray-400">{formatBytes(item.size)}</span>
              </div>
              <button
                onClick={() => deleteMedia(item.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                aria-label="حذف الملف"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {media.length === 0 && !uploading && (
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Paperclip className="h-3.5 w-3.5" />
          <span>لا توجد مرفقات</span>
        </div>
      )}
    </div>
  );
}
