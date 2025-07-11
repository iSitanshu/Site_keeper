import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Create Playlist
export async function POST(request: NextRequest) {
  try {
    const { title, description, themeColor, tags, userId } =
      await request.json();

    if (!title || !description)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );

    if (!userId)
      return NextResponse.json(
        { error: "User must Login before creating a playlist" },
        { status: 401 }
      );

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) return NextResponse.json(
        { error: "User must Login before creating a playlist" },
        { status: 401 }
    );

    const newPlaylist = await prisma.playlist.create({
      data: {
        title,
        description,
        themeColor,
        tags,
        userId, // This links the playlist to the user via foreign key
      },
    });

    return NextResponse.json(
        {message: "Playlist created successfully", playlist: newPlaylist},
        { status: 201 }
    );    
  } catch (error) {
    console.error("Error creating playlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get all playlists for a given user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const playlists = await prisma.playlist.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc", // Optional: sort newest first
      },
    });

    return NextResponse.json(playlists, { status: 200 });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
