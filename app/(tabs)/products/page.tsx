import { getInitialProducts } from "./actions";
import ProductList from "@/components/product-list";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";

export const revalidate = 1;
// false | 0 | number

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function Products() {
  const initialProducts = await getInitialProducts();
  return (
    <div className="flex">
      <ProductList initialProducts={initialProducts} />
      <div className="fixed w-full h-px flex justify-end items-center bottom-32 max-w-screen-md">
        <Link
          href="/products/add"
          className="bg-orange-500 flex items-center justify-center 
        rounded-full size-16 mr-10 text-white 
        transition-colors hover:bg-orange-400"
        >
          <PlusIcon className="size-10" />
        </Link>
      </div>
    </div>
  );
}
