'use client';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    paginate: (page: number | ((prevPage: number) => number)) => void;
    currentPage: number;
    hasNextButton?: {
        next_page_url: string | null;
        prev_page_url: string | null;
    };
}

const Pagination: React.FC<PaginationProps> = ({
                                                   totalItems,
                                                   itemsPerPage,
                                                   paginate,
                                                   currentPage,
                                                   hasNextButton,
                                               }) => {
    return (
        <div className="py-3 flex w-full justify-center">
            {hasNextButton?.prev_page_url && (
                <button
                    onClick={() => paginate((pv) => pv - 1)}
                    className="px-4 py-2 mx-1 rounded-lg text-primary"
                >
                    PREV
                </button>
            )}
            {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => (
                <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 mx-1 rounded-lg ${currentPage === i + 1 ? "bg-blue-200 text-primary" : "bg-white text-primary"}`}
                >
                    {i + 1}
                </button>
            ))}
            {hasNextButton?.next_page_url && (
                <button
                    onClick={() => paginate((pv) => pv + 1)}
                    className="px-4 py-2 mx-1 rounded-lg text-primary"
                >
                    NEXT
                </button>
            )}
        </div>
    );
};

export default Pagination;
