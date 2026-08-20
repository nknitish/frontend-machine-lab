import { useState } from "react";

const defaultTabs = [
  {
    id: "request-1",
    title: "GET /users",
    method: "GET",
    url: "https://api.example.com/users",
  },
  {
    id: "request-2",
    title: "POST /users",
    method: "POST",
    url: "https://api.example.com/users",
  },
  {
    id: "request-3",
    title: "GET /posts",
    method: "GET",
    url: "https://api.example.com/posts",
  },
];

const Tabs = ({ tabs = [] }) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);
  const [requestTabs, setRequestTabs] = useState(tabs);

  if (!requestTabs.length) {
    return <div className="p-4">No tabs available</div>;
  }

  const activeTab = requestTabs.find((tab) => tab.id === activeTabId);

  const handleChange = (field, value) => {
    setRequestTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTabId ? { ...tab, [field]: value } : tab,
      ),
    );
  };

  return (
    <div className="m-5 rounded border border-gray-200 p-2">
      {/* Tabs */}
      <div role="tablist" className="flex w-full gap-2">
        {requestTabs.map((tab) => {
          const isActive = tab.id === activeTabId;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex-1 rounded p-2 ${
                isActive ? "bg-green-200" : "bg-blue-200"
              }`}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      {/* Active request */}
      <div role="tabpanel" className="mt-2 rounded border border-gray-200 p-3">
        <div className="mb-2">
          <strong>Method:</strong> {activeTab.method}
        </div>

        <label className="block">
          <span>URL</span>

          <input
            type="text"
            className="mt-1 w-full rounded border border-gray-300 p-2"
            value={activeTab.url}
            onChange={(event) => handleChange("url", event.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

const App = () => {
  return <Tabs tabs={defaultTabs} />;
};

export default App;
