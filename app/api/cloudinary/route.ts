import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";
import streamifier from "streamifier";
import { prisma } from "@/lib/prisma";
import { UploadApiResponse } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const linkId = formData.get("linkId") as string;

    if (!file) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploaded: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "nextjs-uploads" },
        (err, result) => {
          if (err) reject(err);
          else if (result) resolve(result);
        }
      );
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    if (uploaded.url) {
      if (!linkId)
        return NextResponse.json({ error: "Select a Link" }, { status: 401 });

      const existingLink = await prisma.link.findUnique({
        where: {
          id: linkId,
        },
      });

      if (!existingLink)
        return NextResponse.json({ error: "Select any Link" }, { status: 401 });

      const existingNote = await prisma.note.findFirst({
        where: {
          linkId: linkId,
        },
      });

      if (existingNote) {
        const updatedImageUrls = [...(existingNote?.imageUrl ?? []), uploaded.url];

        const updatedNotes = await prisma.note.update({
          where: { id: existingNote.id },
          data: {
            imageUrl: updatedImageUrls,
          },
        });

        return NextResponse.json(
          { message: "Your Messages", notes: updatedNotes },
          { status: 201 }
        );
      }
    }
    return NextResponse.json(uploaded);
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
