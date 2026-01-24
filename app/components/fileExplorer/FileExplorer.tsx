"use client";

import { useState } from "react";

type FileNode = {
  id: string;
  name: string;
  type: "Folder" | "File";
  subFolder?: FileNode[];
};

const fileStructure: FileNode[] = [
  { id: "1", name: ".next", type: "Folder", subFolder: [] },
  {
    id: "2",
    name: "App",
    type: "Folder",
    subFolder: [
      {
        id: "2-1",
        name: "core",
        type: "Folder",
        subFolder: [
          {
            id: "2-1-1",
            name: "Todos",
            type: "Folder",
            subFolder: [],
          },
          {
            id: "2-1-2",
            name: "Tic Tac Toe",
            type: "Folder",
            subFolder: [{ id: "2-1-2-1", name: "page.tsx", type: "File" }],
          },
        ],
      },
      {
        id: "2-2",
        name: "Hooks",
        type: "Folder",
        subFolder: [],
      },
      { id: "2-3", name: "page.tsx", type: "File" },
      { id: "2-4", name: "Layout.tsx", type: "File" },
    ],
  },
  { id: "3", name: "Node Modules", type: "Folder", subFolder: [] },
  {
    id: "4",
    name: "Public",
    type: "Folder",
    subFolder: [
      { id: "4-1", name: "svg.img", type: "File" },
      { id: "4-2", name: "next.img", type: "File" },
    ],
  },
  { id: "5", name: ".gitIgnore", type: "File" },
  { id: "6", name: "next.config.js", type: "File" },
  { id: "7", name: "package.json", type: "File" },
];

const FileNode = ({ node }: { node: FileNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (node.type === "File") {
    return <div className="ml-4">📄 {node.name}</div>;
  }

  return (
    <div className="ml-4">
      <div
        className="cursor-pointer select-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "📂" : "📁"} {node.name}
      </div>

      {isOpen &&
        node.subFolder?.map((child) => (
          <FileNode key={child.id} node={child} />
        ))}
    </div>
  );
};

const FileExplorer = ({ data }: { data: FileNode[] }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm w-[400px] h-[600px] overflow-hidden flex flex-col">
      <div className="border-b border-gray-200 p-4 bg-gray-50 mb-3">
        <h1 className="text-lg font-semibold text-gray-900 text-center">
          File Explorer
        </h1>
      </div>
      {data.map((node) => (
        <FileNode key={node.id} node={node} />
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <FileExplorer data={fileStructure} />
    </div>
  );
};

export default App;
