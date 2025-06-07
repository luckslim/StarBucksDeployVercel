'use client'
import Image from "next/image";
import logo from "../../assets/logo.svg";
import Google from "../../assets/google.png";
import bghome from "../../assets/bghome.png";
import classic from "../../assets/products/classic.svg";
import icechocolate from "../../assets/products/iceChocolate.svg";
import icematcha from "../../assets/products/icedMatcha.svg";
import icetea from "../../assets/products/iceTea.svg";
import iceship from "../../assets/products/IcedShip.svg";
import { toast, ToastContainer } from "react-toastify";
import { ReactNode, useState, createContext } from "react";
import { Star, Basket, List } from "@phosphor-icons/react/dist/ssr";
import { useCart } from "./context/context";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Login from "./login/page";
export interface Products {
  idStripe: string;
  id: number;
  name: string;
  description: string;
  price: number;
  imageURL: any;
  quantity: number;
}
const initialProduct: Products[] = [
  {idStripe:"price_1RERy1G72GgZdpEW9SM2v96F", id: 1, name: "Café Tradicional", description: "Good Coffee", quantity: 1, price: 10.80, imageURL: classic },
  {idStripe:"price_1RERzBG72GgZdpEWbFRUhYNW", id: 2, name: "ice Chocolate", description: "Good Coffee", quantity: 1, price: 12.40, imageURL: icechocolate },
  {idStripe:"price_1RES0YG72GgZdpEWFqqiHo9Q", id: 3, name: "ice Matcha", description: "Good Coffee", quantity: 1, price: 13.50, imageURL: icematcha },
  {idStripe:"price_1RES1dG72GgZdpEWJb38j4z9", id: 4, name: "ice Tea", description: "Good Coffee", quantity: 1, price: 7.40, imageURL: icetea },
  {idStripe:"price_1RES29G72GgZdpEWvbaZyKWO", id: 5, name: "ice Ship", description: "Good Coffee", quantity: 1, price: 10.50, imageURL: iceship },
];
export default function Home() {
  const [products, setProducts] = useState<Products[]>(initialProduct);
  const { cart, AddToCart } = useCart();
  const router = useRouter();
  const session = useSession();
  function handleClick() {
    router.push('/cart');
  }
  function handleClickList(){
    router.push('/order-list')
  }
  function handleLogout(){
    signOut({
      callbackUrl: "/",  
    })
  }
  function handleIncrease(id: number) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, quantity: product.quantity + 1 } : product
      )
    );
  };
  function handleDecrease(id: number) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };
  return (
    <>
      {session.data ? (
        <div className="grid gap-20">
          <div className="flex justify-around items-center">
            <Image src={logo} width={100} height={100} alt="" />
            <div className="flex gap-1">
              <button onClick={handleLogout} className="flex justify-around items-center gap-1 bg-black text-gray-50 h-10 w-50 cursor-pointer rounded-lg" type="submit">
                <img className="w-8 rounded-xl " src={session.data.user?.image ?? ""} alt="" /> {session.data.user?.name}
              </button>
              <a onClick={handleClick} className="flex justify-center items-center gap-1 bg-gray-100 text-gray-500 h-10 w-10 cursor-pointer rounded-lg">
                <Basket size={27} className="text-black" weight="fill" />
              </a>
              <a onClick={handleClickList} className="flex justify-center items-center gap-1 bg-gray-100 text-gray-500 h-10 w-10 cursor-pointer rounded-lg">
              <List size={27} className="text-black" />
              </a>
            </div>
          </div>

          <div className="mt-8 flex justify-around items-center">
            <div className="items-center grid gap-10">
              <p className="text-green-800 font-extrabold text-7xl">Good Coffee</p>
              <p className="text-gray-500 font-medium text-7xl">Good Moods</p>
              <p className="font-normal text-2xl w-100">
                “To inspire and nurture the human spirit–one person, one cup and one neighborhood at a time.”
              </p>
            </div>
            <Image src={bghome} quality={100} height={500} width={500} alt="" />
          </div>

          <div className="flex justify-center">
            <div className="grid gap-2 justify-center items-center grid-cols-3 w-215">
              {products.map((product) => (
                <div key={product.id} className="flex items-center bg-gray-200 rounded-lg w-70 h-45">
                  <Image src={product.imageURL} width={100} height={100} alt="" />
                  <div className="grid gap-2">
                    <p className=" flex justify-center font-bold text-gray-700 bg-gray-100 rounded-md">{product.name}</p>
                    <p className="flex gap-1 items-center">
                      {product.description}
                      <span className="rounded-lg w-12 h-10 flex items-center justify-center bg-green-100">
                        5.0 <Star size={15} weight="fill" />
                      </span>
                    </p>
                    <div className="flex gap-1 items-center">
                      <span className="font-bold text-emerald-950">QTD:</span>
                      <nav className="flex gap-1">
                        <button onClick={() => handleDecrease(product.id)} className="bg-green-200 w-10 rounded-lg text-green-700 font-bold text-2xl cursor-pointer">-</button>
                        <span className="flex items-center justify-center font-bold border-0 rounded-lg text-center bg-gray-100 text-green-600 w-10">{product.quantity}</span>
                        <button onClick={() => handleIncrease(product.id)} className="bg-green-200 w-10 rounded-lg text-green-700 font-bold text-2xl cursor-pointer">+</button>
                      </nav>
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="font-bold text-emerald-950">R${product.price.toFixed(2)}</span>
                      <button onClick={() => AddToCart(product, product.quantity)} className="bg-white text-gray-600 font-bold rounded-lg w-25 h-8 cursor-pointer">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ToastContainer position="bottom-right" />
        </div>
      ) : (
        <Login/>
      )}

    </>

  );
}