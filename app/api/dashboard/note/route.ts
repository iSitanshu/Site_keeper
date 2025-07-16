import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text, linkId } = await request.json();

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
            linkId: linkId
        }
    })

    if(existingNote) {
        const updatedNotes = await prisma.note.update({
            where: { id: existingNote.id },
            data: { text }
        });
        return NextResponse.json(
            {message: "Your Messages", notes: updatedNotes},
            {status: 201}
        )
    };

    const newNote = await prisma.note.create({
      data: {
        text,
        linkId ,
      },
    });

    return NextResponse.json(
      { message: "Notes added successfully", notes: newNote },
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
    const linkId = searchParams.get("linkId");

    if (!linkId)
      return NextResponse.json(
        { error: "Select the playlist and add Link" },
        { status: 400 }
      );

    const notes = await prisma.note.findMany({
      where: {
        linkId: linkId,
      },
    });
    console.log("Notes get",notes)

    return NextResponse.json(
      { message: "Notes related to the link", notes: notes },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching Notes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
