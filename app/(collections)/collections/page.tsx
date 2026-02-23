"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { fetchProducts } from "@/store/slices/products";
import { fetchCategories } from "@/store/slices/categories";
import CollectionHeader from "./_components/collection-header";
import CategoryFilters from "./_components/category-filters";
import ProductGrid from "./_components/product-grid";
import CollectionPagination from "./_components/collection-pagination";
import type { Category } from "@/services/collection/index.service";

const ITEMS_PER_PAGE = 6;

export default function CollectionsPage() {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);
  const { categories } = useAppSelector((state) => state.categories);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryOptions: Category[] = useMemo(
    () => [
      { id: "all", label: "All Delicacies" },
      ...categories.filter((category) => category.id !== "all"),
    ],
    [categories]
  );

  const effectiveActiveCategory =
    activeCategory === "all" ||
    categories.some((category) => category.id === activeCategory)
      ? activeCategory
      : "all";

  const hasBackendCategories = categories.length > 0;
  const categoryScopedProducts = hasBackendCategories
    ? products.filter((product) =>
        categories.some((category) => category.id === product.category)
      )
    : products;

  const filteredProducts =
    effectiveActiveCategory === "all"
      ? categoryScopedProducts
      : products.filter((p) => p.category === effectiveActiveCategory);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProducts = filteredProducts.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="main-container mx-auto py-12">
        <CollectionHeader />
        <CategoryFilters
          categories={categoryOptions}
          activeCategory={effectiveActiveCategory}
          onCategoryChange={handleCategoryChange}
        />
        <ProductGrid products={paginatedProducts} loading={loading} />
        <CollectionPagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
