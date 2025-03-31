"use client"
import { auth } from "@/lib/firebase/config";
import { login } from "@/lib/redux/slice";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function AuthProvider({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          login({
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
          })
        );
        router.push("/dashboard");
        toast.success("Welcome Back!")
      }else{
        toast.success("You have been logged out successfully")
      }
    });
    return () => unsubscribe();
  }, [dispatch, router]);
  return children;
}
