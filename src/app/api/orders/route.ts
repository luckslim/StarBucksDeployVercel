import { Prisma, PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
interface Product{
  description:string
  quantity: number
  total:number
}
interface OrderData {
  username:string
  email:string
  product: Product[]
  total: string
}
export async function POST(req: NextRequest) {
  const prisma = new  PrismaClient()
  const data = (await req.json()) as OrderData
  const {username, email, product, total}= data
  const formattedProducts= product.map(p=>({
    name: p.description,
    quantity: p.quantity,
    total: p.total
  }))
  const order = await prisma.orders.create({
    data:{
      name: username,
      email: email, 
      products: formattedProducts as Prisma.InputJsonValue,
      total: total, 
    }
  })
  return NextResponse.json({
    message: 'Ordem recebida com sucesso!',
    order
  })
}
