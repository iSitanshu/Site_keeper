import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description, themeColor, tags } = await request.json();

  try {
    const playlist = await prisma.playlist.create({
      data: {
        title,
        description,
        themeColor,
        tags,
        user: { connect: { id: session.user.id } },
      },
    });

    return NextResponse.json(
      { message: "Playlist created Successfully", playlist: playlist },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while creating new playlist ", error);
    return NextResponse.json(
      { error: "Error while creation of playlist" },
      { status: 409 }
    );
  }
}

export async function GET(request: NextRequest){
    const session = await getServerSession(authOptions);

    if(!session) return NextResponse.json(
        { error: "Unauthorized "},
        { status: 401 }
    )

    try {
        const playlists = await prisma.playlist.findMany({
            where: {
                user: {
                    id: session.user.id
                }
            },
            include: {
                links: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(
            {message: `All the playlist created by the user: ${session.user.email}`, playlist: playlists},
            {status: 200}
        )
    } catch (error) {
        console.error("Error fetching playlists",error);
        return NextResponse.json(
            {error: "Failed to fetch playlist"},
            {status: 500}
        )
    }
}