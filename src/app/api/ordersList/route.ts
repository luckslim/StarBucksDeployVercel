import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req:NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email') || "";
    try {
        const orders = await prisma.orders.findMany({
            where:{email},
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(orders)
    } catch (error) {
        console.error("Erro ao buscar pedidos:", error)
        return NextResponse.json({ error: "Erro ao buscar pedidos" }, { status: 500 })
    }
}
