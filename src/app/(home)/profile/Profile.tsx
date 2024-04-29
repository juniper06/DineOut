"use client";

import ProfilePicture from "@/components/ProfilePicture";
import useAuth from "@/components/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Profile() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <>
        <Avatar className="w-48 h-48">
          <AvatarImage alt="Profile Picture" className="animate-pulse" />
          <AvatarFallback>{user.userDetails?.name}</AvatarFallback>
        </Avatar>
        <Skeleton className="h-[28px] w-[250px] bg-orange-300" />
        <Skeleton className="h-[28px] w-[250px] bg-orange-200" />
      </>
    );
  }

  return (
    <>
      <ProfilePicture />
      <h1 className="text-2xl font-extrabold capitalize">
        {user.userDetails?.name}
      </h1>
      <p className="font-semibold text-gray-400">{user.userDetails?.email}</p>
    </>
  );
}
