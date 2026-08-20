import { AdIcon, Delete } from "lucide-react";
import { useState } from "react";

const defaultData = [
  {
    id: "1",
    key: "Content-Type",
    value: "application/json",
    enabled: true,
  },
  {
    id: "2",
    key: "Authorization",
    value: "Bearer abc123",
    enabled: true,
  },
];

const TableHeader = () => {
  return (
    <thead>
      <tr className="border-b border-gray-200">
        <th className="border-l border-gray-200 px-3 py-2"></th>
        <th className="border-l border-gray-200 px-3 py-2">Key</th>
        <th className="border-l border-gray-200 px-3 py-2">Value</th>
        <th className="border-l border-gray-200 px-3 py-2">Enabled</th>
        <th className="border-l border-gray-200 px-3 py-2">Actions</th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  record,
  handleEnabledChange,
  handleChange,
  handleDelete,
}) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="w-10 px-3 py-2">
        <input
          type="checkbox"
          checked={record.enabled}
          onChange={(event) =>
            handleEnabledChange(record.id, event.target.checked)
          }
        />
      </td>
      <td className="border-l border-gray-200 px-3 py-2">
        <input
          type="text"
          value={record.key}
          onChange={(e) => handleChange(record.id, "key", e.target.value)}
        />
      </td>
      <td className="border-l border-gray-200 px-3 py-2">
        <input
          type="text"
          value={record.value}
          onChange={(e) => handleChange(record.id, "value", e.target.value)}
        />
      </td>
      <td className="border-l border-gray-200 px-3 py-2">
        {record.enabled ? "Y" : "N"}
      </td>
      <td className="border-l border-gray-200 px-3 py-2">
        <button
          onClick={() => handleDelete(record.id)}
          aria-label={`Delete ${record.id}`}
          type="button"
        >
          <Delete size={16} />
        </button>
      </td>
    </tr>
  );
};

const NewRow = ({ handleCreateNewRow }) => {
  const [newRow, setNewRow] = useState({
    key: "",
    value: "",
    enabled: true,
  });

  const handleAddNewRow = () => {
    console.log(newRow);
    if (!newRow.key.trim() || !newRow.value.trim()) {
      return;
    }

    handleCreateNewRow({
      id: crypto.randomUUID(),
      ...newRow,
    });

    setNewRow({
      key: "",
      value: "",
      enabled: true,
    });
  };
  return (
    <tr className="border-b border-gray-200">
      <td className="w-10 px-3 py-2">
        <input type="checkbox" checked={true} />
      </td>
      <td className="border-l border-gray-200 px-3 py-2">
        <input
          type="text"
          placeholder="Enter Key"
          value={newRow.key}
          onChange={(e) =>
            setNewRow((prev) => {
              return { ...prev, key: e.target.value };
            })
          }
        />
      </td>
      <td className="border-l border-gray-200 px-3 py-2">
        <input
          type="text"
          value={newRow.value}
          placeholder="Enter Value"
          onChange={(e) =>
            setNewRow((prev) => {
              return { ...prev, value: e.target.value };
            })
          }
        />
      </td>
      <td className="border-l border-gray-200 px-3 py-2">{"Y"}</td>
      <td className="border-l border-gray-200 px-3 py-2">
        <button
          role="button"
          aria-level={"Create new Record"}
          onClick={handleAddNewRow}
        >
          <AdIcon />
        </button>
      </td>
    </tr>
  );
};
const KeyValueEditor = ({ initialRecords }) => {
  const [records, setRecords] = useState(initialRecords);

  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };
  const handleEnabledChange = (id, enabled) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === id ? { ...record, enabled } : record,
      ),
    );
  };

  const handleChange = (rowId, field, value) => {
    setRecords((prev) =>
      prev.map((record) => {
        return record.id === rowId ? { ...record, [field]: value } : record;
      }),
    );
  };

  const handleCreateNewRow = (newRow) => {
    setRecords((prev) => [...prev, newRow]);
  };

  return (
    <div className="rounded-lg border border-gray-300 m-5">
      <table className="w-full">
        <TableHeader />
        <tbody>
          {records.map((record) => (
            <TableRow
              key={record.id}
              record={record}
              handleEnabledChange={handleEnabledChange}
              handleChange={handleChange}
              handleDelete={handleDelete}
            />
          ))}
          <NewRow handleCreateNewRow={handleCreateNewRow} />
        </tbody>
      </table>
    </div>
  );
};
const App = () => {
  return (
    <div>
      <KeyValueEditor initialRecords={defaultData} />
    </div>
  );
};

export default App;
