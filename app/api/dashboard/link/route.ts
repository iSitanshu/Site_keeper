import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url, customTitle, aiTags, customDescription, genre, playlistId } =
      await request.json();
    if (!url || !customTitle || !aiTags || !customDescription || !genre)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );

    if (!playlistId)
      return NextResponse.json(
        { error: "No playlist ID found!" },
        { status: 401 }
      );

    const existingPlaylist = await prisma.playlist.findUnique({
      where: { id: playlistId },
    });

    if (!existingPlaylist)
      return NextResponse.json(
        { error: "User must select playlist before add links" },
        { status: 401 }
      );

    const newLink = await prisma.link.create({
      data: {
        url,
        customTitle,
        aiTags,
        customDescription,
        genre,
        playlistId,
      },
    });

    return NextResponse.json(
      { message: "Link added successfully", link: newLink },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while adding Link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const playlistId = searchParams.get("playlistId");

    if (!playlistId) {
      return NextResponse.json(
        { error: "PlaylistId is required" },
        { status: 400 }
      );
    }

    const links = await prisma.link.findMany({
        where: {
            playlistId: playlistId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

     return NextResponse.json(links, { status: 200 });

  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
