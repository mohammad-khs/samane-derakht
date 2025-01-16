import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FC } from "react";
import MyFavorites from "./myFavorites";

interface FavoritesProps {}

const Favorites: FC<FavoritesProps> = async () => {
  const session = await getServerSession(authOptions);
  if (session === null) {
    redirect("/");
  }
  return (
    <>
      <div className="flex justify-between items-center  mb-4">
        <h1 className="text-2xl">لیست علاقه‌مندی‌ها</h1>
      </div>
      <MyFavorites session={session} />
    </>
  );
};

export default Favorites;
