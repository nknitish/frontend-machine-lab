import { useState } from "react";

let productList = [
  {
    image: "https://picsum.photos/200/300",
    title: "Apple",
    price: 150,
    id: "1",
  },
  {
    image: "https://picsum.photos/200/300",
    title: "Banana",
    price: 100,
    id: "2",
  },
  {
    image: "https://picsum.photos/200/300",
    title: "Orange",
    price: 90,
    id: "3",
  },
  {
    image: "https://picsum.photos/200/300",
    title: "Guava",
    price: 120,
    id: "4",
  },
  {
    image: "https://picsum.photos/200/300",
    title: "Pineapple",
    price: 150,
    id: "5",
  },
];

const Item = ({ item, onDragStart, onDrop }) => {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(item.id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(item.id)}
      className="w-[22%] bg-amber-50 border border-gray-300 shadow-2xl p-4 border-r-2"
    >
      <img className="w-full" src={item.image} alt="Item Image" />

      <div className="flex justify-between mt-2">
        <h2 className="text-lg font-bold">{item.title}</h2>
        <p>{"₹ " + item.price}</p>
      </div>
    </div>
  );
};

export default function App() {
  const [dragID, setDragID] = useState(null);
  const [products, setProducts] = useState(productList);

  const onDrop = (dropID) => {
    if (dragID === dropID) return;

    setProducts((prev) => {
      const updated = [...prev];

      const dragIndex = updated.findIndex((item) => item.id === dragID);
      const dropIndex = updated.findIndex((item) => item.id === dropID);

      // Swap items
      [updated[dragIndex], updated[dropIndex]] = [
        updated[dropIndex],
        updated[dragIndex],
      ];

      return updated;
    });

    setDragID(null);
  };

  const handleDragStart = (id) => {
    setDragID(id);
  };

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-wrap justify-between gap-4 p-5"
      >
        {products.map((product) => (
          <Item
            key={product.id}
            item={product}
            onDragStart={handleDragStart}
            onDrop={onDrop}
          />
        ))}
      </div>
    </div>
  );
}
