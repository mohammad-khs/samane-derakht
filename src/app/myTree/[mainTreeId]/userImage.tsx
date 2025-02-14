import { FC } from "react";
import { FaUserCircle } from "react-icons/fa";

interface UserImageProps {
  imageUrl: string;
}

const UserImage: FC<UserImageProps> = ({ imageUrl }) => {
  return (
    <>
      {imageUrl ? (
        <img
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${imageUrl}`}
          alt="Profile"
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <FaUserCircle size={50} className="text-gray-600" />
      )}
    </>
  );
};

export default UserImage;
