"use client"
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  setTimeout(() => {
    router.push("/products");
  }, 2000);
  return (
    <div>
      <h2>محصول مورد نظر پیدا نشد</h2>
      <p>لطفا دوباره تلاش کنید</p>
    </div>
  );
}
