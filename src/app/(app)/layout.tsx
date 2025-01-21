"use client";
import AppLayout from "@/components/layout";
import SmallSpinner from "@/components/shared/progress/small-spinner";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn } = useUser();
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const router = useRouter(); // Next.js router for redirection

  useEffect(() => {
    // Simulate a delay before checking login status
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        router.push("/login"); // Redirect to login if not logged in
      } else {
        setLoading(false); // Set loading to false if user is logged in
      }
    }, 200); // Delay

    return () => clearTimeout(timer); // Clean up the timer when the component is unmounted
  }, [isLoggedIn, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <SmallSpinner className="w-10 h-10" />
      </div>
    ); // You can style this better with a spinner or custom loading screen
  }
  return <AppLayout>{children}</AppLayout>;
}
