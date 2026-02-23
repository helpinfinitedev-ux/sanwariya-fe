"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import {
  fetchCategories,
  fetchProducts,
  collectionsActions,
} from "@/store/slices/collections";
import CollectionHeader from "./_components/collection-header";
import CategoryFilters from "./_components/category-filters";
import ProductGrid from "./_components/product-grid";
import CollectionPagination from "./_components/collection-pagination";
import type { Category } from "@/services/collection/index.service";

const ITEMS_PER_PAGE = 6;

export default function CollectionsPage() {
  const dispatch = useAppDispatch();
  const { products, categories, loading, activeCategory, currentPage } =
    useAppSelector((state) => state.collections);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryOptions: Category[] = [
    { id: "all", label: "All Delicacies" },
    ...categories.filter((category) => category.id !== "all"),
  ];

  useEffect(() => {
    if (
      activeCategory !== "all" &&
      !categories.some((category) => category.id === activeCategory)
    ) {
      dispatch(collectionsActions.setActiveCategory("all"));
    }
  }, [activeCategory, categories, dispatch]);

  const hasBackendCategories = categories.length > 0;
  const categoryScopedProducts = hasBackendCategories
    ? products.filter((product) =>
        categories.some((category) => category.id === product.category)
      )
    : products;

  const filteredProducts =
    activeCategory === "all"
      ? categoryScopedProducts
      : products.filter((p) => p.category === activeCategory);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (categoryId: string) => {
    dispatch(collectionsActions.setActiveCategory(categoryId));
  };

  const handlePageChange = (page: number) => {
    dispatch(collectionsActions.setCurrentPage(page));
  };

  return (
    <div className="w-full min-h-screen">
      <div className="main-container mx-auto py-12">
        <CollectionHeader />
        <CategoryFilters
          categories={categoryOptions}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        <ProductGrid products={paginatedProducts} loading={loading} />
        <CollectionPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
