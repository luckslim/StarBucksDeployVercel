"use client"
import Image from "next/image";
import logo from "../../../assets/logo.svg";
import bghome from "../../../assets/bghome.png";
import google from "../../../assets/google.png";
import { signIn } from "next-auth/react";
export default function Login() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center text-center p-10">
          <div className="flex flex-col items-center">
            <Image
              src={bghome}
              height={500}
              width={500}
              alt="Background"
              className="mt-4"
            />
          </div>
          <div className="flex flex-col items-center gap-6 mt-6">
            <p className="text-green-800 font-extrabold text-7xl">
              Good Coffee
            </p>
            <p className="font-normal max-w-md text-gray-700">
              “To inspire and nurture the human spirit–one person, one cup and
              one neighborhood at a time.”
            </p>
            <button onClick={()=>signIn('google')} className="flex justify-center items-center gap-2 font-bold text-white bg-black h-13 w-70 rounded-lg shadow-md hover:bg-gray-800 transition duration-300">
              Logar com Google
              <Image src={google} height={30} width={30} alt="Google Logo" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
