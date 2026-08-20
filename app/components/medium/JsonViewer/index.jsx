import { useState } from "react";

const defaultData = {
  id: 12345,
  name: "John Doe",
  email: "john@example.com",
  active: true,
  phone: null,

  roles: ["developer", "admin", "reviewer"],

  address: {
    city: "Bangalore",
    country: "India",
  },

  skills: [
    {
      name: "React",
      experience: 5,
    },
    {
      name: "JavaScript",
      experience: 7,
    },
    {
      name: "TypeScript",
      experience: 4,
    },
  ],

  projects: [
    {
      id: 1,
      name: "API Dashboard",
      status: "active",
      technologies: ["React", "Node.js", "PostgreSQL"],
    },
    {
      id: 2,
      name: "Developer Portal",
      status: "completed",
      technologies: ["Next.js", "TypeScript"],
    },
  ],
};

const JsonNode = ({ keyName, value, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const paddingLeft = depth * 20;

  // null
  if (value === null) {
    return (
      <div style={{ paddingLeft }}>
        <span>{keyName}: </span>
        <span>null</span>
      </div>
    );
  }

  // primitive
  if (typeof value !== "object") {
    return (
      <div style={{ paddingLeft }}>
        <span>{keyName}: </span>
        <span>{String(value)}</span>
      </div>
    );
  }

  const isArray = Array.isArray(value);

  // Object / Array
  return (
    <div>
      <button
        type="button"
        className="flex items-center gap-1"
        style={{ paddingLeft }}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <span>{isExpanded ? "▼" : "▶"}</span>
        <span>{keyName}</span>
      </button>

      {isExpanded && (
        <div>
          {isArray
            ? value.map((child, index) => (
                <JsonNode
                  key={index}
                  keyName={index}
                  value={child}
                  depth={depth + 1}
                />
              ))
            : Object.entries(value).map(([key, child]) => (
                <JsonNode
                  key={key}
                  keyName={key}
                  value={child}
                  depth={depth + 1}
                />
              ))}
        </div>
      )}
    </div>
  );
};

const JsonViewer = ({ data = {} }) => {
  return (
    <div className="p-4">
      {Object.entries(data).map(([key, value]) => (
        <JsonNode key={key} keyName={key} value={value} depth={0} />
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <JsonViewer data={defaultData} />
    </div>
  );
};

export default App;
