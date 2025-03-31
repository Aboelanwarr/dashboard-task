"use client";
import { auth } from "@/lib/firebase/config";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Singin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const onLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      <button
        className="flex gap-4 items-center justify-center cursor-pointer border-2 border-gray-200 rounded-xl p-3 lg:p-8 lg:w-1/4 hover:border-primary hover:text-grey-300 hover:scale-110 transition-all duration-200"
        onClick={onLogin}
      >
        <Image src="/google.svg" width={20} height={20} alt="google" />
        Sign In With Google
      </button>
    </div>
  );
}
