import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

interface CollectionPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CollectionPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: CollectionPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-14">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-lg text-beige/50 hover:text-gold-bright hover:bg-transparent"
      >
        <Icon icon="solar:alt-arrow-left-linear" width={20} />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "ghost"}
          size="icon"
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-lg text-sm ${
            currentPage !== page
              ? "text-beige/60 hover:text-gold-bright hover:bg-transparent"
              : ""
          }`}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-lg text-beige/50 hover:text-gold-bright hover:bg-transparent"
      >
        <Icon icon="solar:alt-arrow-right-linear" width={20} />
      </Button>
    </div>
  );
};

export default CollectionPagination;
