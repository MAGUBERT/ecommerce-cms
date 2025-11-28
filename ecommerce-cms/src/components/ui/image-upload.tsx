import { useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  bucket?: string;
}

export function ImageUpload({ value, onChange, bucket = "products" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecione uma imagem válida");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Imagem muito grande. Máximo 5MB");
      return;
    }

    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      // Upload to Supabase Storage with upsert enabled
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

      const publicUrl = data.publicUrl;
      setPreview(publicUrl);
      onChange(publicUrl);
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      const message = error instanceof Error ? error.message : "Erro ao fazer upload da imagem. Verifique as configurações do Supabase Storage.";
      alert(message);
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    setPreview(undefined);
    onChange("");
  }

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-w-md h-48 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label
              htmlFor="image-upload"
              className="flex-1 cursor-pointer inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              <Upload className="w-4 h-4" />
              {uploading ? "Enviando..." : "Escolher arquivo"}
            </label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
            {uploading && (
              <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Formatos aceitos: JPG, PNG, GIF, WEBP (máx. 5MB)
          </p>
        </div>
      )}
    </div>
  );
}
