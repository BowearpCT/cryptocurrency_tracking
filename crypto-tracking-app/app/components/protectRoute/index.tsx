"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "@/app/stores/auth.store";

type Props = {
  children: React.ReactNode | JSX.Element;
};

const ProtectedRoute: React.FC<Props> = ({ children }: Props) => {
  const router = useRouter();
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (!token || !user) {
      router.push("/login");
    }
  }, [token, user, router]);

  if (!token || !user) {
    return null; // or a loading spinner
  }
  return <>{children}</>;
};

export default ProtectedRoute;
