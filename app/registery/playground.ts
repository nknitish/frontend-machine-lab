"use client";

import type { ComponentType } from "react";

type PlaygroundItem = {
  id: string;
  title: string;
  component: ComponentType<any>;
  level: "easy" | "medium" | "advance";
};

import component0 from "../components/advance/EmailDashboard";
import component1 from "../components/advance/FileExplorer";
import component2 from "../components/advance/InfiniteScroll";
import component3 from "../components/easy/Accordion";
import component4 from "../components/easy/DragDropImage";
import component5 from "../components/easy/Drawer";
import component6 from "../components/easy/DropDown";
import component7 from "../components/easy/Modal";
import component8 from "../components/easy/MultiSelect";
import component9 from "../components/easy/ResizeWindow";
import component10 from "../components/easy/Stepper";
import component11 from "../components/easy/Toast";
import component12 from "../components/easy/Todos";
import component13 from "../components/easy/UiComponent";
import component14 from "../components/medium/DynamicTable";
import component15 from "../components/medium/Pagination";
import component16 from "../components/medium/PersonSearch";
import component17 from "../components/medium/TableGrid";
import component18 from "../components/medium/Tabs";
import component19 from "../components/medium/TaskManager";
import component20 from "../components/medium/TicTacToe";
import component21 from "../components/medium/ToastContainer";

export const playgroundItems: PlaygroundItem[] = [
  {
    id: "email-dashboard",
    title: "Email Dashboard",
    component: component0,
    level: "advance",
  },
  {
    id: "file-explorer",
    title: "File Explorer",
    component: component1,
    level: "advance",
  },
  {
    id: "infinite-scroll",
    title: "Infinite Scroll",
    component: component2,
    level: "advance",
  },
  {
    id: "accordion",
    title: "Accordion",
    component: component3,
    level: "easy",
  },
  {
    id: "drag-drop-image",
    title: "Drag Drop Image",
    component: component4,
    level: "easy",
  },
  {
    id: "drawer",
    title: "Drawer",
    component: component5,
    level: "easy",
  },
  {
    id: "drop-down",
    title: "Drop Down",
    component: component6,
    level: "easy",
  },
  {
    id: "modal",
    title: "Modal",
    component: component7,
    level: "easy",
  },
  {
    id: "multi-select",
    title: "Multi Select",
    component: component8,
    level: "easy",
  },
  {
    id: "resize-window",
    title: "Resize Window",
    component: component9,
    level: "easy",
  },
  {
    id: "stepper",
    title: "Stepper",
    component: component10,
    level: "easy",
  },
  {
    id: "toast",
    title: "Toast",
    component: component11,
    level: "easy",
  },
  {
    id: "todos",
    title: "Todos",
    component: component12,
    level: "easy",
  },
  {
    id: "ui-component",
    title: "Ui Component",
    component: component13,
    level: "easy",
  },
  {
    id: "dynamic-table",
    title: "Dynamic Table",
    component: component14,
    level: "medium",
  },
  {
    id: "pagination",
    title: "Pagination",
    component: component15,
    level: "medium",
  },
  {
    id: "person-search",
    title: "Person Search",
    component: component16,
    level: "medium",
  },
  {
    id: "table-grid",
    title: "Table Grid",
    component: component17,
    level: "medium",
  },
  {
    id: "tabs",
    title: "Tabs",
    component: component18,
    level: "medium",
  },
  {
    id: "task-manager",
    title: "Task Manager",
    component: component19,
    level: "medium",
  },
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    component: component20,
    level: "medium",
  },
  {
    id: "toast-container",
    title: "Toast Container",
    component: component21,
    level: "medium",
  },
];
