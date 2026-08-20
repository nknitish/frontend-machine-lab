"use client";

import { useState } from "react";

const fileStructure = [
  {
    id: "1",
    name: ".next",
    type: "Folder",
    subFolder: [],
  },
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
            subFolder: [
              {
                id: "2-1-2-1",
                name: "page.tsx",
                type: "File",
              },
            ],
          },
        ],
      },
      {
        id: "2-2",
        name: "Hooks",
        type: "Folder",
        subFolder: [],
      },
      {
        id: "2-3",
        name: "page.tsx",
        type: "File",
      },
      {
        id: "2-4",
        name: "Layout.tsx",
        type: "File",
      },
    ],
  },
  {
    id: "3",
    name: "Node Modules",
    type: "Folder",
    subFolder: [],
  },
  {
    id: "4",
    name: "Public",
    type: "Folder",
    subFolder: [
      {
        id: "4-1",
        name: "svg.img",
        type: "File",
      },
      {
        id: "4-2",
        name: "next.img",
        type: "File",
      },
    ],
  },
  {
    id: "5",
    name: ".gitIgnore",
    type: "File",
  },
  {
    id: "6",
    name: "next.config.js",
    type: "File",
  },
  {
    id: "7",
    name: "package.json",
    type: "File",
  },
];

/* =====================================================
   ADD NODE
   ===================================================== */

function addNodeToTree(nodes, parentId, newNode) {
  return nodes.map((node) => {
    // Parent found
    if (node.id === parentId) {
      const children = node.subFolder || [];

      // Prevent duplicate names
      const alreadyExists = children.some(
        (child) => child.name === newNode.name,
      );

      if (alreadyExists) {
        return node;
      }

      return {
        ...node,
        subFolder: [...children, newNode],
      };
    }

    // Search recursively
    if (node.type === "Folder") {
      return {
        ...node,
        subFolder: addNodeToTree(node.subFolder || [], parentId, newNode),
      };
    }

    return node;
  });
}

/* =====================================================
   RENAME NODE
   ===================================================== */

function renameNode(nodes, nodeId, newName) {
  return nodes.map((node) => {
    // Found node
    if (node.id === nodeId) {
      return {
        ...node,
        name: newName,
      };
    }

    // Search recursively
    if (node.type === "Folder") {
      return {
        ...node,
        subFolder: renameNode(node.subFolder || [], nodeId, newName),
      };
    }

    return node;
  });
}

/* =====================================================
   DELETE NODE
   ===================================================== */

function deleteNode(nodes, nodeId) {
  return nodes
    .filter((node) => node.id !== nodeId)
    .map((node) => {
      if (node.type === "Folder") {
        return {
          ...node,
          subFolder: deleteNode(node.subFolder || [], nodeId),
        };
      }

      return node;
    });
}

/* =====================================================
   FILE NODE
   ===================================================== */

const FileNode = ({ node, onNewFolder, onNewFile, onRename, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  /* ================= FILE ================= */

  if (node.type === "File") {
    return (
      <div className="ml-4 flex items-center gap-2 py-1">
        <span>📄 {node.name}</span>

        <button
          className="text-xs border px-2 py-1 rounded"
          onClick={() => onRename(node.id)}
        >
          Rename
        </button>

        <button
          className="text-xs border px-2 py-1 rounded"
          onClick={() => onDelete(node.id)}
        >
          Delete
        </button>
      </div>
    );
  }

  /* ================= FOLDER ================= */

  return (
    <div className="ml-4">
      <div className="flex items-center gap-2 py-1">
        {/* Folder name */}
        <div
          className="cursor-pointer select-none"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "📂" : "📁"} {node.name}
        </div>

        {/* New Folder */}
        <button
          className="text-xs border px-2 py-1 rounded"
          onClick={(e) => {
            e.stopPropagation();
            onNewFolder(node.id);
          }}
        >
          + Folder
        </button>

        {/* New File */}
        <button
          className="text-xs border px-2 py-1 rounded"
          onClick={(e) => {
            e.stopPropagation();
            onNewFile(node.id);
          }}
        >
          + File
        </button>

        {/* Rename */}
        <button
          className="text-xs border px-2 py-1 rounded"
          onClick={(e) => {
            e.stopPropagation();
            onRename(node.id);
          }}
        >
          Rename
        </button>

        {/* Delete */}
        <button
          className="text-xs border px-2 py-1 rounded"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(node.id);
          }}
        >
          Delete
        </button>
      </div>

      {/* Children */}
      {isOpen &&
        node.subFolder?.map((child) => (
          <FileNode
            key={child.id}
            node={child}
            onNewFolder={onNewFolder}
            onNewFile={onNewFile}
            onRename={onRename}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
};

/* =====================================================
   FILE EXPLORER
   ===================================================== */

const FileExplorer = ({ data }) => {
  const [nodes, setNodes] = useState(data);

  /* ===================================================
     NEW FOLDER
     =================================================== */

  const handleNewFolder = (parentId) => {
    const folderName = prompt("Enter Folder Name");

    if (!folderName?.trim()) {
      return;
    }

    const newFolder = {
      id: crypto.randomUUID(),
      name: folderName.trim(),
      type: "Folder",
      subFolder: [],
    };

    setNodes((prev) => addNodeToTree(prev, parentId, newFolder));
  };

  /* ===================================================
     NEW FILE
     =================================================== */

  const handleNewFile = (parentId) => {
    const fileName = prompt("Enter File Name");

    if (!fileName?.trim()) {
      return;
    }

    const newFile = {
      id: crypto.randomUUID(),
      name: fileName.trim(),
      type: "File",
    };

    setNodes((prev) => addNodeToTree(prev, parentId, newFile));
  };

  /* ===================================================
     RENAME
     =================================================== */

  const handleRename = (nodeId) => {
    const newName = prompt("Enter New Name");

    if (!newName?.trim()) {
      return;
    }

    setNodes((prev) => renameNode(prev, nodeId, newName.trim()));
  };

  /* ===================================================
     DELETE
     =================================================== */

  const handleDelete = (nodeId) => {
    const confirmed = window.confirm("Are you sure you want to delete this?");

    if (!confirmed) {
      return;
    }

    setNodes((prev) => deleteNode(prev, nodeId));
  };

  /* ===================================================
     UI
     =================================================== */

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm w-[700px] min-h-[600px] overflow-hidden flex flex-col">
      <div className="border-b border-gray-200 p-4 bg-gray-50">
        <h1 className="text-lg font-semibold text-gray-900 text-center">
          File Explorer
        </h1>
      </div>

      <div className="p-4">
        {nodes.map((node) => (
          <FileNode
            key={node.id}
            node={node}
            onNewFolder={handleNewFolder}
            onNewFile={handleNewFile}
            onRename={handleRename}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

/* =====================================================
   APP
   ===================================================== */

const App = () => {
  return (
    <div className="p-10">
      <FileExplorer data={fileStructure} />
    </div>
  );
};

export default App;
