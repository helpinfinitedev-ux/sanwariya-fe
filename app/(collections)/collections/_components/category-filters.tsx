import { Button } from "@/components/ui/button";
import type { Category } from "@/services/collection/index.service";

interface CategoryFiltersProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilters = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-10">
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={activeCategory === cat.id ? "default" : "gold-outline"}
          onClick={() => onCategoryChange(cat.id)}
          className={`rounded-full tracking-wide ${
            activeCategory !== cat.id
              ? "border-white/30 text-white/80 hover:border-gold/50 hover:text-gold-bright"
              : ""
          }`}
        >
          {cat.label}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilters;
