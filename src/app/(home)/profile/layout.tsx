import Profile from "@/app/(home)/profile/Profile";
import ProfileNav from "@/components/ProfileNav";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen pt-[140px] bg-orange-500">
      <div className="container h-full py-10 grid grid-cols-12 gap-x-12 grid-rows-3">
        <div className="col-span-4 rounded-3xl bg-cornsilk-500 flex flex-col px-4 row-span-3">
          <div className="flex flex-col items-center justify-center gap-y-2 flex-1">
            <Profile />
          </div>
          <Separator className="w-full h-1 bg-orange-500" />
          <div className="flex flex-col flex-1 gap-y-10 py-4">
            <ProfileNav />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
