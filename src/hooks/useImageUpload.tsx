import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UseImageUploadOptions {
  bucket: string;
  folder?: string;
  maxSizeMB?: number;
}

export function useImageUpload({ bucket, folder = "", maxSizeMB = 5 }: UseImageUploadOptions) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) return null;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return null;
    }

    // Validate file size
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error(`Image must be less than ${maxSizeMB}MB`);
      return null;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      setProgress(30);

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      setProgress(80);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setProgress(100);
      
      return publicUrl;
    } catch (error: any) {
      console.error("Upload error:", error);
      const message = error?.message || "";
      if (message.includes("Bucket not found") || message.includes("bucket")) {
        toast.error("Image storage is not configured. Please contact support.");
      } else if (message.includes("new row violates") || message.includes("policy")) {
        toast.error("Permission denied. Please log in again and retry.");
      } else if (message.includes("Payload too large") || message.includes("413")) {
        toast.error(`Image is too large. Maximum size is ${maxSizeMB}MB.`);
      } else {
        toast.error("Failed to upload image. Please try again.");
      }
      return null;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const deleteImage = async (url: string): Promise<boolean> => {
    if (!url) return false;

    try {
      // Extract file path from URL
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split(`/storage/v1/object/public/${bucket}/`);
      if (pathParts.length < 2) return false;
      
      const filePath = pathParts[1];

      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Delete error:", error);
      return false;
    }
  };

  return {
    uploadImage,
    deleteImage,
    uploading,
    progress,
  };
}
