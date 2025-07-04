"use client";
import { useAuth } from "@/context/authContext";
import { LogIn, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Profile from "./Profile";
import { AuthModal } from "./auth/AuthModal";

function Header() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'signin' | 'signup' }>({
    isOpen: false,
    mode: 'signin'
  });

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'signin' });
  };

  return (
    <>
      <header className="px-10 py-6 bg-[#D7DEDC] text-gray-500 flex justify-between items-center">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={45} height={45} />
          <h1 className="font-extrabold text-2xl text-[#7263f3]">JobFindr</h1>
        </Link>

        <ul className="flex items-center gap-8">
          <li>
            <Link
              href={"/findwork"}
              className={`py-2 px-6 rounded-md ${
                pathname === "/findwork"
                  ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                  : ""
              }`}
            >
              Find Work
            </Link>
            <Link
              href={"/myjobs"}
              className={`py-2 px-6 rounded-md ${
                pathname === "/myjobs"
                  ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                  : ""
              }`}
            >
              My Jobs
            </Link>
            <Link
              href={"/post"}
              className={`py-2 px-6 rounded-md ${
                pathname === "/post"
                  ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3]/10"
                  : ""
              }`}
            >
              Post a Job
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          {user ? (
            <Profile />
          ) : (
            <div className="flex items-center gap-6">
              <button
                onClick={() => openAuthModal('signin')}
                className="py-2 px-6 rounded-md border flex items-center gap-4 bg-[#7263F3] text-white border-[#7263F3] hover:bg-[#7263F3]/90 transition-all duration-200 ease-in-out"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="py-2 px-6 rounded-md border flex items-center gap-4 border-[#7263F3] text-[#7263F3] hover:bg-[#7263F3]/10 transition-all duration-200 ease-in-out"
              >
                <UserPlus className="w-4 h-4" />
                Register
              </button>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        mode={authModal.mode}
      />
    </>
  );
}

export default Header;