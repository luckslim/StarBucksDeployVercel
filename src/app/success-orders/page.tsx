"use client";
import { useEffect } from "react";
import { api } from "../lib/axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface Product {
  description: string;
  quantity: number;
  amount_total: number;
}
interface Props {
  name?: string;
  email?: string;
  products: Product[];
}
export default function SuccessOrder({ email, name, products }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter()
  useEffect(() => {
    async function registerOrder() {
      try {
        const formattedProducts = products.map((product) => ({
          description: product.description,
          quantity: product.quantity,
          total: product.amount_total / 100,
        }));
        // const totalAmount =
        //   products.reduce((acc, product) => {
        //     return acc + product.amount_total;
        //   }, 0) / 100;
        const totalAmount = (
          products.reduce((acc, product) => acc + product.amount_total, 0) / 100
        ).toFixed(2);
        console.log(totalAmount)
        const nameNew = session?.user?.name
        const emailNew = session?.user?.email

        if (!nameNew || !emailNew) {
          console.warn("Nome ou email não disponível na sessão.");
          return;
        }
        await api.post("/orders", {
          username: nameNew,
          email: emailNew,
          product: formattedProducts,
          total: totalAmount,
        });
      } catch (err) {
        console.error("Erro ao registrar pedido:", err);
      }
    }

    registerOrder();
    setTimeout(()=>{
      router.push('/order-list')
    },2000)
  }, [name, email, status, products]);
  return null
}

