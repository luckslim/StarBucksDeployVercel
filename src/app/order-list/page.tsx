"use client";
import { House, List } from "@phosphor-icons/react/dist/ssr";
import logo from "../../../assets/logo.svg";
import drawLogo from "../../../assets/drawStarBucks.png";
import codebar from "../../../assets/codebar.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { DateTime } from "next-auth/providers/kakao";

type Product = {
  name: string;
  quantity: number;
  total: number;
};

type Order = {
  id: string;
  name: string;
  email: string;
  products: Product[];
  total: number;
  createdAt: string;
};

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const session = useSession();
  const router = useRouter();

  function handleClick() {
    router.push("/");
  }

  useEffect(() => {
    if (!session.data?.user?.email) return;

    async function fetchOrders() {
      const email = session.data?.user?.email;
      try {
        const res = await fetch(`/api/ordersList?email=${email}`);
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("erro ao buscar pedidos!", error);
      }
    }

    fetchOrders();
  }, [session]);
  return (
    <div className="flex flex-col gap-20">
      <div className="flex justify-around items-center">
        <Image src={logo} width={100} height={100} alt="" />
        <div className="flex gap-1">
          <button
            className="flex justify-around items-center gap-1 bg-black text-gray-50 h-10 w-50 cursor-pointer rounded-lg"
            type="submit"
          >
            Order List <List size={32} weight="light" />
          </button>
          <a
            onClick={handleClick}
            className="flex justify-center items-center gap-1 bg-gray-100 text-gray-500 h-10 w-10 cursor-pointer rounded-lg"
          >
            <House size={27} className="text-black" weight="fill" />
          </a>
        </div>
      </div>

      <div className="flex justify-around items-center">
        <div className="items-center grid gap-10">
          <p className="text-green-800 font-extrabold text-7xl">Order-List</p>
          <p className="font-normal text-gray-500 text-2xl w-100">
            “your orders here and ever”
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="grid gap-3 grid-cols-4 justify-center items-center w-280">
          {orders.map((order) => (
            <div key={order.id} className="flex flex-col gap-10 bg-gray-200 rounded-lg">
              <div className="flex justify-around items-center">
                <Image
                  quality={10}
                  src={drawLogo}
                  height={100}
                  width={80}
                  alt=""
                />
                <span className="flex justify-center bg-gray-50 w-30 rounded-xl">
                  #{order.id.slice(15,80)}
                </span>
              </div>
              <div className="text-center flex flex-col text-gray-500">
                <table>
                  <thead>
                    <tr>
                      <th>Products</th>
                      <th>Price</th>
                      <th>Quant.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product, idx) => (
                      <tr key={idx}>
                        <td>{product.name}</td>
                        <td>R$ {product.total.toFixed(2)}</td>
                        <td>{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>Total</td>
                      <td colSpan={2}>R$ {order.total}</td>
                    </tr>
                  </tfoot>
                </table>
                {order.createdAt}
              </div>
              <Image src={codebar} height={100} width={280} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

