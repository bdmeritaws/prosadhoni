import React from 'react';

function CustomPagination(props) {
    const {products} = props;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // প্রতি পেজে কয়টা প্রোডাক্ট দেখাবে
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    return (
        <div className="flex justify-center mt-6 space-x-2">
            <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                Prev
            </button>
            {(() => {
                const pageNumbers = [];
                const maxPagesToShow = 5;
                let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
                let endPage = startPage + maxPagesToShow - 1;
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = Math.max(endPage - maxPagesToShow + 1, 1);
                }

                for (let i = startPage; i <= endPage; i++) {
                    pageNumbers.push(i);
                }

                return pageNumbers.map((num) => (
                    <button
                        key={num}
                        onClick={() => setCurrentPage(num)}
                        className={`px-3 py-1 rounded ${
                            currentPage === num ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        }`}
                    >
                        {num}
                    </button>
                ));
            })()}
            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                Next
            </button>
        </div>
    );
}

export default CustomPagination;