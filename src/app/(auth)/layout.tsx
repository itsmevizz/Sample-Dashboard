"use client";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn } = useUser();
  const router = useRouter(); // Next.js router for redirection

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/"); // Redirect to login if not logged in
    }
  }, [isLoggedIn, router]);

  return children;
}
