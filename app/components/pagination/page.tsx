"use client";

type PaginationItem = {
  item: number;
};

import { useEffect, useMemo, useState } from "react";

const ITEM_PER_PAGE = 10;
const generateData = (page: number): PaginationItem[] => {
  return Array.from({ length: ITEM_PER_PAGE }, (_, i) => {
    return {
      item: (page - 1) * ITEM_PER_PAGE + i + 1,
    };
  });
};

const Pagination = ({ item }: { item: number }) => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [list, setList] = useState<PaginationItem[]>([]);

  //set the max page
  useEffect(() => {
    setMaxPage(Math.ceil(item / ITEM_PER_PAGE));
  }, [item]);

  useEffect(() => {
    setList(generateData(page));
  }, [page]);

  const handleNext = () => {
    if (page === maxPage) return;
    setPage((pre) => pre + 1);
  };
  const handlePrev = () => {
    if (page === 1) return;
    setPage((pre) => pre - 1);
  };

  console.log({ page, maxPage });

  const renderbuttons = useMemo(() => {
    let buttons = [];
    const delta = 2;

    if (maxPage < 9) {
      for (let i = 1; i <= maxPage; i++) {
        buttons.push(
          <button
            onClick={() => setPage(i)}
            className={`bg-gray-200 px-4 py-2 ronded rounded cursor-pointer ${
              i === page && `bg-blue-200`
            }`}
            key={i}
          >
            {i}
          </button>
        );
      }
    } else {
      //Show first button
      buttons.push(
        <button
          onClick={() => setPage(1)}
          className={`bg-gray-200 px-4 py-2 ronded rounded cursor-pointer ${
            1 === page && `bg-blue-200`
          }`}
          key={1}
        >
          {1}
        </button>
      );

      buttons.push(<span>....</span>);
      //show last button

      buttons.push(
        <button
          onClick={() => setPage(maxPage)}
          className={`bg-gray-200 px-4 py-2 ronded rounded cursor-pointer ${
            maxPage === page && `bg-blue-200`
          }`}
        >
          {maxPage}
        </button>
      );
    }

    return buttons;
  }, [maxPage]);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-2xl w-2xl">
      <h1 className="text-center font-bold text-3xl">Pagination</h1>

      {/* Items */}
      <div className="overflow-y-scroll h-[500px] m-4">
        {list.map(({ item }) => (
          <div
            key={item}
            className={`p-2 border border-gray-100 rounded shadow mb-2 `}
          >
            <h1 className="text-lg font-bold">{item}</h1>
            <p>This is description for {item}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handlePrev}
          className="bg-blue-200  px-4 py-2 rounded cursor-pointer"
        >
          &lt; Prev{" "}
        </button>

        {renderbuttons}
        <button
          onClick={handleNext}
          className="bg-blue-200  px-4 py-2 rounded cursor-pointer"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Pagination item={80} />
    </>
  );
};

export default App;
