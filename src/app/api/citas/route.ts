import { NextResponse } from "next/server";
import { solicitarCitaAction } from "@/features/citas/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await solicitarCitaAction(body);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error en endpoint /api/citas:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error interno al procesar la solicitud de cita.",
      },
      { status: 500 }
    );
  }
}
