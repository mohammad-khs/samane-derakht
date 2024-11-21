import { FC } from "react";
import ProgressBar from "../progressBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import UploadSpec from "./uploadSpec";

interface FilmAndDescriptionProps {}

const FilmAndDescription: FC<FilmAndDescriptionProps> = async () => {
  const session = await getServerSession(authOptions);

  if (session === null) {
    redirect("/");
  }

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-4/5 lg:w-3/5">
          <ProgressBar step="3" />
        </div>
      </div>
      <UploadSpec session={session} />
    </>
  );
};

export default FilmAndDescription;
