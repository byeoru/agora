import { notFound } from "next/navigation";
import { getProduct } from "./actions";
import getSession from "@/lib/session";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { formatToLocalDate, formatToWon } from "@/lib/utils";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }

  const isOwner = await getIsOwner(product.user_id);
  return (
    <div>
      <div className="relative aspect-square">
        <Image
          fill
          src={`${product.photo}/public`}
          alt={product.title}
          className="object-cover"
        />
      </div>
      <div className="p-5 flex items-center justify-between border-b border-neutral-700">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full overflow-hidden">
            {product.user.avatar !== null ? (
              <Image
                src={product.user.avatar}
                alt={product.user.username}
                width={40}
                height={40}
              />
            ) : (
              <UserIcon />
            )}
          </div>
          <div>
            <h3>{product.user.username}</h3>
          </div>
        </div>
        <div className="flex flex-col">
          <span>{formatToLocalDate(product.created_at)}</span>
          <span>{product.created_at.toLocaleTimeString()}</span>
        </div>
      </div>
      <div className="p-5 mb-28">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div
        className="fixed w-full flex justify-center bottom-0 left-0 p-5 bg-neutral-800 
      "
      >
        <div className="w-full max-w-screen-md flex justify-between items-center">
          <span className="font-semibold text-lg">
            {formatToWon(product.price)}원
          </span>
          {isOwner ? (
            <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
              삭제하기
            </button>
          ) : (
            <Link
              className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
              href={``}
            >
              채팅하기
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
