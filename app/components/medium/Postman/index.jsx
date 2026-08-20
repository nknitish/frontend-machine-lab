import { useState } from "react";

const defaultTabs = [
  {
    id: "request-1",
    title: "GET /users",
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/users",
    response: null,
    loading: false,
    error: null,
  },
  {
    id: "request-2",
    title: "GET /posts",
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/posts",
    response: null,
    loading: false,
    error: null,
  },
];

const Tabs = ({ tabs = [] }) => {
  const [requestTabs, setRequestTabs] = useState(tabs);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  const activeTab = requestTabs.find((tab) => tab.id === activeTabId);

  const handleChange = (field, value) => {
    setRequestTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTabId ? { ...tab, [field]: value } : tab,
      ),
    );
  };

  const handleSend = async () => {
    setRequestTabs((prev) =>
      prev.map((tab) =>
        tab.id === activeTabId
          ? {
              ...tab,
              loading: true,
              error: null,
            }
          : tab,
      ),
    );

    try {
      const response = await fetch(activeTab.url);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      setRequestTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeTabId
            ? {
                ...tab,
                response: data,
                loading: false,
              }
            : tab,
        ),
      );
    } catch (error) {
      setRequestTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeTabId
            ? {
                ...tab,
                loading: false,
                error: error.message,
              }
            : tab,
        ),
      );
    }
  };

  if (!activeTab) {
    return <div>No tabs available</div>;
  }

  return (
    <div className="m-5 rounded border p-2">
      {/* Tabs */}
      <div role="tablist" className="flex gap-2">
        {requestTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTabId}
            onClick={() => setActiveTabId(tab.id)}
            className={`flex-1 rounded p-2 ${
              tab.id === activeTabId ? "bg-green-200" : "bg-blue-200"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Request */}
      <div className="mt-2 rounded border p-3">
        <div className="mb-2">
          <strong>Method:</strong> {activeTab.method}
        </div>

        <label>
          <span>URL</span>

          <input
            type="text"
            value={activeTab.url}
            onChange={(e) => handleChange("url", e.target.value)}
            className="mt-1 w-full rounded border p-2"
          />
        </label>

        <button
          onClick={handleSend}
          disabled={activeTab.loading}
          className="mt-2 rounded border p-2"
        >
          {activeTab.loading ? "Sending..." : "Send"}
        </button>
      </div>

      {/* Response */}
      <div className="mt-2 rounded border p-3">
        <h3 className="font-bold">Response</h3>

        {activeTab.error && <p className="text-red-500">{activeTab.error}</p>}

        {activeTab.response && (
          <pre className="mt-2 max-h-96 overflow-auto rounded bg-gray-100 p-3">
            {JSON.stringify(activeTab.response, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return <Tabs tabs={defaultTabs} />;
};

export default App;
