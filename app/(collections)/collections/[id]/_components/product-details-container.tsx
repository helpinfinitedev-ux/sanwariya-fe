"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import {
  collectionsActions,
  fetchProductById,
  fetchRelatedProducts,
} from "@/store/slices/collections";
import ProductDetailsSkeleton from "./product-details-skeleton";
import ProductMediaGallery from "./product-media-gallery";
import ProductPurchasePanel from "./product-purchase-panel";
import ProductState from "./product-state";
import RelatedProducts from "./related-products";

interface ProductDetailsContainerProps {
  productId: string;
}

const ProductDetailsContainer = ({ productId }: ProductDetailsContainerProps) => {
  const dispatch = useAppDispatch();
  const {
    currentProduct,
    currentProductLoading,
    currentProductError,
    relatedProducts,
  } = useAppSelector((state) => state.collections);

  const parsedId = Number(productId);

  useEffect(() => {
    if (Number.isInteger(parsedId) && parsedId > 0) {
      dispatch(fetchProductById(parsedId));
    }

    return () => {
      dispatch(collectionsActions.clearProductDetailsState());
    };
  }, [dispatch, parsedId]);

  useEffect(() => {
    if (currentProduct) {
      dispatch(
        fetchRelatedProducts({
          productId: currentProduct.id,
          category: currentProduct.category,
        })
      );
    }
  }, [dispatch, currentProduct]);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return (
      <ProductState
        title="Invalid Product"
        message="The product link looks invalid. Please choose a product from our collection."
      />
    );
  }

  if (currentProductLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (currentProductError) {
    const isNotFoundError = currentProductError === "Product not found.";
    return (
      <ProductState
        title={isNotFoundError ? "Product Not Found" : "Unable to Load Product"}
        message={
          isNotFoundError
            ? "This item may have been removed or is no longer available."
            : currentProductError
        }
        retry={
          isNotFoundError ? undefined : () => dispatch(fetchProductById(parsedId))
        }
      />
    );
  }

  if (!currentProduct) {
    return (
      <ProductState
        title="Unable to Load Product"
        message="Please try again in a moment."
        retry={() => dispatch(fetchProductById(parsedId))}
      />
    );
  }

  const galleryImages = relatedProducts.slice(0, 3).map((item) => item.image);

  return (
    <>
      <section className="main-container mx-auto py-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductMediaGallery
            name={currentProduct.name}
            heroImage={currentProduct.image}
            altImages={galleryImages}
          />
          <ProductPurchasePanel product={currentProduct} />
        </div>
      </section>
      <RelatedProducts products={relatedProducts} />
    </>
  );
};

export default ProductDetailsContainer;
