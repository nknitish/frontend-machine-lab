"use client";

import type { ComponentType } from "react";

type PlaygroundItem = {
  id: string;
  title: string;
  component: ComponentType<any>;
  level: "easy" | "medium" | "hard";
};

import component0 from "../components/advance/EmailDashboard";
import component1 from "../components/advance/FileExplorer";
import component2 from "../components/advance/InfiniteScroll";
import component3 from "../components/easy/Accordion";
import component4 from "../components/easy/Modal";
import component5 from "../components/easy/Pagination";
import component6 from "../components/easy/ResizeWindow";
import component7 from "../components/easy/TicTacToe";
import component8 from "../components/easy/Todos";
import component9 from "../components/medium/DragDropImage";
import component10 from "../components/medium/DynamicTable";
import component11 from "../components/medium/MultiSelect";
import component12 from "../components/medium/PersonSearch";
import component13 from "../components/medium/TaskManager";

export const playgroundItems: PlaygroundItem[] = [
  {
    id: "email-dashboard",
    title: "Email Dashboard",
    component: component0,
    level: "hard",
  },
  {
    id: "file-explorer",
    title: "File Explorer",
    component: component1,
    level: "hard",
  },
  {
    id: "infinite-scroll",
    title: "Infinite Scroll",
    component: component2,
    level: "hard",
  },
  {
    id: "accordion",
    title: "Accordion",
    component: component3,
    level: "easy",
  },
  {
    id: "modal",
    title: "Modal",
    component: component4,
    level: "easy",
  },
  {
    id: "pagination",
    title: "Pagination",
    component: component5,
    level: "easy",
  },
  {
    id: "resize-window",
    title: "Resize Window",
    component: component6,
    level: "easy",
  },
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    component: component7,
    level: "easy",
  },
  {
    id: "todos",
    title: "Todos",
    component: component8,
    level: "easy",
  },
  {
    id: "drag-drop-image",
    title: "Drag Drop Image",
    component: component9,
    level: "medium",
  },
  {
    id: "dynamic-table",
    title: "Dynamic Table",
    component: component10,
    level: "medium",
  },
  {
    id: "multi-select",
    title: "Multi Select",
    component: component11,
    level: "medium",
  },
  {
    id: "person-search",
    title: "Person Search",
    component: component12,
    level: "medium",
  },
  {
    id: "task-manager",
    title: "Task Manager",
    component: component13,
    level: "medium",
  },
];
