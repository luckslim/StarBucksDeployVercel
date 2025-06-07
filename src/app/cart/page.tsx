"use client";
import Image from "next/image";
import bghome from "../../../assets/bghome.png";
import logo from "../../../assets/logo.svg"
import { useCart } from "../context/context";
import { House } from "phosphor-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Basket } from "@phosphor-icons/react/dist/ssr";
export default function Cart() {
  const { cart, removeFromCart, calculateTotal } = useCart();
  const router = useRouter()
  const session = useSession()
  function handleClick(){
    router.push('/')
  }
  async function checkoutButton() {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error("Erro ao criar sessão de checkout:", data);
      }
    } catch (error) {
      console.log("erro ao iniciar checkout", error);
    }
  }
  return (
    <div className="flex flex-col gap-20">
      <div className="flex justify-around items-center">
        <Image src={logo} width={100} height={100} alt="" />
        <div className="flex gap-1">
          <button
            className="flex justify-around items-center gap-1 bg-black text-gray-50 h-10 w-50 cursor-pointer rounded-lg"
            type="submit"
          >
            Market Cart<Basket className="text-white" size={27} />
          </button>
          <a
            onClick={handleClick}
            className="flex justify-center items-center gap-1 bg-gray-100 text-gray-500 h-10 w-10 cursor-pointer rounded-lg"
          >
            <House size={27} className="text-black" weight="fill" />
          </a>
        </div>
      </div>
      <div className="flex justify-around items-center text-center mt-10">
        <div className="flex flex-col items-center gap-6 mt-6">
          <Image src={bghome} height={500} width={500} alt="" />
          <p className="text-green-800 font-extrabold text-7xl">Good Coffee</p>
          <p className="font-normal max-w-md text-gray-700">
            “To inspire and nurture the human spirit–one person, one cup and one
            neighborhood at a time.”
          </p>
        </div>
        {cart.length === 0 ? (
          <div className="bg-gray-300 text-gray-500 font-bold  rounded-lg w-40">
            Carrinho vazio
          </div>
        ) : (
          <div className="grid justify-around text-center bg-gray-50 p-auto rounded-lg w-100 ">
            {cart.map((product) => (
              <div className="flex justify-around items-center w-100 text-center border-b-1 border-b-gray-200">
                <Image src={product.imageURL} height={100} width={100} alt="" />
                <div className="flex flex-col gap-1 items-center text-center justify-center ">
                  <p className="text-gray-600 bg-gray-200 w-40 rounded-lg font-bold">
                    {product.name}
                  </p>
                  <div className="flex gap-1">
                    <p className="text-gray-600 bg-gray-200 w-20 rounded-full font-bold">
                      R${product.price.toFixed(2)}
                    </p>
                    <p className="text-yellow-600 bg-yellow-200 w-20 rounded-full font-bold">
                      {product.quantity}
                      {"  "}
                      {product.quantity == 1 ? "item" : "itens"}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="bg-indigo-200 rounded-lg w-20 h-8 text-indigo-700 font-semibold cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-center items-center bg-green-200 text-green-600 border-1 font-bold h-10">
              Total: R${calculateTotal()}
            </div>
            <button
              onClick={checkoutButton}
              className="flex justify-center items-center gap-2 font-bold text-white bg-black h-13 rounded-bl-2xl rounded-br-2xl  shadow-md hover:bg-gray-800 transition duration-300"
            >
              Fazer pagamento
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
