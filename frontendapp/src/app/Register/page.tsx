"use client";

import React, { useEffect, useRef, useState } from "react";
import myLottie from "../../../public/images/Earth globe rotating with Seamless loop animation.json";
import Lottie from "lottie-web";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Layout/Navbar/Navbar";
import { api } from "@/lib/api";
import { isAxiosError } from "axios";
import Image from "next/image";

export default function Register() {
  const router = useRouter();
  const lottieRef = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lottieRef.current) {
      const animation = Lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: myLottie,
      });

      return () => {
        animation.destroy();
      };
    }
  }, []);

  const goToLogin = () => {
    router.push("/Login");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const name = [firstName.trim(), lastName.trim()].filter(Boolean).join(" ") || undefined;
    try {
      const response = await api.post<{ id: number; email: string; name?: string | null }>(
        "/users/register",
        { email, password, ...(name ? { name } : {}) },
      );
      if (response.data?.id) {
        router.push("/Login");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      if (isAxiosError(err)) {
        const msg = (err.response?.data as { message?: string })?.message;
        setError(typeof msg === "string" ? msg : "Registration failed.");
      } else {
        setError("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="relative flex h-screen w-full items-center justify-center border-white/10 bg-slate-900/60">
      <div className="absolute inset-0 z-0" aria-hidden>
              <Image
                src="/images/maroc.jpg"
                alt=""
                fill
                role="presentation"
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-[#323232]/88" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#323232]/50 via-[#323232]/30 to-[#323232]/90" />
            </div>
        <div className="relative z-10 mx-auto w-full max-w-4xl space-y-6 text-center sm:space-y-8 bg-slate-900/60 shadow-2xl shadow-black/40 backdrop-blur-md rounded-2xl p-6">
        <form
          className="flex h-full w-full flex-col items-center justify-center gap-10 p-10"
          onSubmit={handleRegister}
        >
          <h1 className="mt-20 text-4xl">Let’s start your Journey together! </h1>
          {error ? (
            <p className="max-w-md rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-center text-sm text-red-200">
              {error}
            </p>
          ) : null}
          <div className="flex w-full flex-col justify-center gap-20 p-2 md:flex-row">
            <div className="flex w-full flex-col">
              <input
                type="text"
                autoComplete="given-name"
                placeholder="First Name"
                className="peer rounded border-b-2 border-secondryColor bg-inherit p-2 text-white outline-none focus:placeholder-gray-500 focus:placeholder-opacity-0"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="invisible absolute -translate-y-4 text-gray-500 peer-focus:visible">
                First Name
              </label>
            </div>
            <div className="flex w-full flex-col">
              <input
                type="text"
                autoComplete="family-name"
                placeholder="Last Name"
                className="peer rounded border-b-2 border-secondryColor bg-inherit p-2 text-white outline-none focus:placeholder-gray-500 focus:placeholder-opacity-0"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label className="invisible absolute -translate-y-4 text-gray-500 peer-focus:visible">
                Last Name
              </label>
            </div>
          </div>
          <div className="flex w-full flex-col justify-center gap-20 p-2 md:flex-row">
            <div className="flex w-full flex-col">
              <input
                type="email"
                autoComplete="email"
                placeholder="Email "
                className="peer rounded border-b-2 border-secondryColor bg-inherit p-2 text-white outline-none focus:placeholder-gray-500 focus:placeholder-opacity-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="invisible absolute -translate-y-4 text-gray-500 peer-focus:visible">
                Email
              </label>
            </div>
            <div className="flex w-full flex-col">
              <input
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                className="peer rounded border-b-2 border-secondryColor bg-inherit p-2 text-white outline-none focus:placeholder-gray-500 focus:placeholder-opacity-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="invisible absolute -translate-y-4 text-gray-500 peer-focus:visible">
                Password{" "}
              </label>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button
              type="submit"
              disabled={loading}
              className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-[#9aea30] px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-lg shadow-orange-500/40 transition hover:bg-[#9aea30] disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Register"}
            </button>
          </div>
          <div>
            <p>
              Have an account ?{" "}
              <span
                className="cursor-pointer font-bold text-[#9aea30]"
                onClick={goToLogin}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && goToLogin()}
              >
                Log in
              </span>
            </p>
          </div>
        </form>
        </div>
      </div>
    </>
  );
}
