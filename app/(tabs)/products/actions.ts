"use server";

import db from "@/lib/db";

export async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      photo: true,
      created_at: true,
    },
    take: PAGE_SIZE,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

const PAGE_SIZE = 15;

export async function getMoreProducts(page: number) {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      photo: true,
      created_at: true,
    },
    skip: page * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}
