"use client";

import React, { useState } from "react";
import { useEffect } from "react";

const TableGrid = ({ count }) => {
  const [val, setVal] = useState([]);

  useEffect(() => {
    setVal(
      Array.from({ length: count }, () =>
        Array.from({ length: count }, () => ""),
      ),
    );
  }, [count]);

  const handleCellClick = (rowIndex, colIndex) => {
    setVal((prev) =>
      prev.map((row, r) =>
        row.map((cell, c) => {
          if (r === rowIndex && c === colIndex) {
            return cell || r * count + c + 1;
          }
          return cell;
        }),
      ),
    );
  };
  return (
    <div className="m-4">
      <table>
        <tbody>
          {val.map((rows, rowIndex) => (
            <tr key={rowIndex} className="border">
              {rows.map((rowVal, colIndex) => {
                return (
                  <td
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    key={rowIndex * count + colIndex + 1}
                    className="border w-10 h-10 text-center"
                  >
                    {rowVal}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function App() {
  return <TableGrid count={10} />;
}
