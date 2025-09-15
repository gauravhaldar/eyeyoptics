import React, { cache } from "react";
import SunglassDetail from "./SunglassDetailClient";

const getProductBySlug = cache(async (slug) => {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      }/api/products/${slug}`
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch product: ${res.status} ${res.statusText}`
      );
    }
    const data = await res.json();
    return data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
});

export default async function Page({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div className="text-center py-10">Product not found.</div>;
  }

  return <SunglassDetail product={product} slug={slug} />;
}
