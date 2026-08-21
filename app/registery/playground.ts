"use client";

import type { ComponentType } from "react";

type PlaygroundItem = {
  id: string;
  title: string;
  component: ComponentType<any>;
  level: "easy" | "medium" | "advance";
};

import component0 from "../components/advance/AutoComplete";
import component1 from "../components/advance/EmailDashboard";
import component2 from "../components/advance/FileExplorer";
import component3 from "../components/advance/InfiniteScroll";
import component4 from "../components/easy/Accordion";
import component5 from "../components/easy/ColorGrid";
import component6 from "../components/easy/DragDropImage";
import component7 from "../components/easy/Drawer";
import component8 from "../components/easy/DropDown";
import component9 from "../components/easy/Modal";
import component10 from "../components/easy/MultiSelect";
import component11 from "../components/easy/ProgressBar";
import component12 from "../components/easy/Rating";
import component13 from "../components/easy/ResizeWindow";
import component14 from "../components/easy/Stepper";
import component15 from "../components/easy/Toast";
import component16 from "../components/easy/Todos";
import component17 from "../components/easy/UiComponent";
import component18 from "../components/medium/DataTable";
import component19 from "../components/medium/DynamicTable";
import component20 from "../components/medium/FormBuilder";
import component21 from "../components/medium/JsonViewer";
import component22 from "../components/medium/KeyValeTable";
import component23 from "../components/medium/Navigation";
import component24 from "../components/medium/Pagination";
import component25 from "../components/medium/PersonSearch";
import component26 from "../components/medium/Postman";
import component27 from "../components/medium/TableGrid";
import component28 from "../components/medium/Tabs";
import component29 from "../components/medium/TaskManager";
import component30 from "../components/medium/TicTacToe";
import component31 from "../components/medium/ToastContainer";
import component32 from "../components/medium/TrafficLight";

export const playgroundItems: PlaygroundItem[] = [
  {
    id: "auto-complete",
    title: "Auto Complete",
    component: component0,
    level: "advance",
  },
  {
    id: "email-dashboard",
    title: "Email Dashboard",
    component: component1,
    level: "advance",
  },
  {
    id: "file-explorer",
    title: "File Explorer",
    component: component2,
    level: "advance",
  },
  {
    id: "infinite-scroll",
    title: "Infinite Scroll",
    component: component3,
    level: "advance",
  },
  {
    id: "accordion",
    title: "Accordion",
    component: component4,
    level: "easy",
  },
  {
    id: "color-grid",
    title: "Color Grid",
    component: component5,
    level: "easy",
  },
  {
    id: "drag-drop-image",
    title: "Drag Drop Image",
    component: component6,
    level: "easy",
  },
  {
    id: "drawer",
    title: "Drawer",
    component: component7,
    level: "easy",
  },
  {
    id: "drop-down",
    title: "Drop Down",
    component: component8,
    level: "easy",
  },
  {
    id: "modal",
    title: "Modal",
    component: component9,
    level: "easy",
  },
  {
    id: "multi-select",
    title: "Multi Select",
    component: component10,
    level: "easy",
  },
  {
    id: "progress-bar",
    title: "Progress Bar",
    component: component11,
    level: "easy",
  },
  {
    id: "rating",
    title: "Rating",
    component: component12,
    level: "easy",
  },
  {
    id: "resize-window",
    title: "Resize Window",
    component: component13,
    level: "easy",
  },
  {
    id: "stepper",
    title: "Stepper",
    component: component14,
    level: "easy",
  },
  {
    id: "toast",
    title: "Toast",
    component: component15,
    level: "easy",
  },
  {
    id: "todos",
    title: "Todos",
    component: component16,
    level: "easy",
  },
  {
    id: "ui-component",
    title: "Ui Component",
    component: component17,
    level: "easy",
  },
  {
    id: "data-table",
    title: "Data Table",
    component: component18,
    level: "medium",
  },
  {
    id: "dynamic-table",
    title: "Dynamic Table",
    component: component19,
    level: "medium",
  },
  {
    id: "form-builder",
    title: "Form Builder",
    component: component20,
    level: "medium",
  },
  {
    id: "json-viewer",
    title: "Json Viewer",
    component: component21,
    level: "medium",
  },
  {
    id: "key-vale-table",
    title: "Key Vale Table",
    component: component22,
    level: "medium",
  },
  {
    id: "navigation",
    title: "Navigation",
    component: component23,
    level: "medium",
  },
  {
    id: "pagination",
    title: "Pagination",
    component: component24,
    level: "medium",
  },
  {
    id: "person-search",
    title: "Person Search",
    component: component25,
    level: "medium",
  },
  {
    id: "postman",
    title: "Postman",
    component: component26,
    level: "medium",
  },
  {
    id: "table-grid",
    title: "Table Grid",
    component: component27,
    level: "medium",
  },
  {
    id: "tabs",
    title: "Tabs",
    component: component28,
    level: "medium",
  },
  {
    id: "task-manager",
    title: "Task Manager",
    component: component29,
    level: "medium",
  },
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    component: component30,
    level: "medium",
  },
  {
    id: "toast-container",
    title: "Toast Container",
    component: component31,
    level: "medium",
  },
  {
    id: "traffic-light",
    title: "Traffic Light",
    component: component32,
    level: "medium",
  },
];
