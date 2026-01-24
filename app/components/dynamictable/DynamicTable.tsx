import { useEffect, useState } from "react";

interface DataItem {
  [key: string]: string | number | object | null | undefined;
}

interface TableProps {
  title: string;
  data?: DataItem[];
  onDataChange: (data: DataItem[]) => void;
}

const Table = ({ title, data = [], onDataChange }: TableProps) => {
  const keys = Object.keys(data[0] || {});

  const formatObjectValue = (obj: unknown): string => {
    if (typeof obj !== "object" || obj === null) return String(obj);
    return Object.entries(obj)
      .filter(([_, value]) => typeof value !== "object")
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
  };

  const handleCellClick = (
    rowIndex: number,
    key: string,
    value: unknown,
  ): void => {
    if (typeof value === "object") return;

    const newValue = prompt(`Edit ${key}:`, String(value));

    if (newValue !== null && newValue !== String(value)) {
      const updatedData = [...data];
      updatedData[rowIndex][key] = newValue;
      onDataChange(updatedData);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="border border-gray-300 w-full">
          <thead className="bg-gray-100">
            <tr>
              {keys.map((key) => (
                <th
                  className="border border-gray-300 px-4 py-2 text-left"
                  key={key}
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((user, rowIndex) => {
              return (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {keys.map((key) => {
                    const cellValue = user[key];
                    const isObject = typeof cellValue === "object";

                    return (
                      <td
                        key={key}
                        className="border border-gray-300 px-4 py-2"
                        onClick={() =>
                          handleCellClick(rowIndex, key, cellValue)
                        }
                        style={{ cursor: isObject ? "default" : "pointer" }}
                      >
                        {isObject
                          ? formatObjectValue(cellValue)
                          : String(cellValue)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const App = () => {
  const [data, setData] = useState<DataItem[]>([]);

  const getData = (): void => {
    const url = `https://jsonplaceholder.typicode.com/users`;

    fetch(url)
      .then((response) => response.json())
      .then((result: DataItem[]) => {
        setData(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDataChange = (updatedData: DataItem[]): void => {
    setData(updatedData);
    console.log("Data updated:", updatedData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Table
        title={"Customers Info"}
        data={data}
        onDataChange={handleDataChange}
      />
    </div>
  );
};

export default App;
