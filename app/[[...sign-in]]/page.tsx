"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Homepage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  console.log("user", user);
  const router = useRouter();
  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className="flexicjc h-screen bg-blue-100">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="flex flex-col gap-2 rounded-md bg-white p-12 shadow-2xl"
        >
          <h1 className="flexic gap-2 text-xl font-bold">
            <Image src="/images/logo.png" alt="logo" width={24} height={24} />
            School Management
          </h1>
          <h2 className="text-gray-500">Sign in to your account</h2>

          <Clerk.GlobalError className="text-sm text-red-400" />
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="rounded-md border p-2 shadow-xs outline-none"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="rounded-md border p-2 shadow-xs outline-none"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          <SignIn.Action
            submit
            className="my-1 rounded-md bg-blue-500 px-10 py-2 text-sm text-white"
          >
            Sign in
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default Homepage;
