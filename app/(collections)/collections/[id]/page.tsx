import ProductDetailsContainer from "./_components/product-details-container";

interface CollectionProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function CollectionProductPage({
  params,
}: CollectionProductPageProps) {
  const { id } = await params;

  return <ProductDetailsContainer productId={id} />;
}

