import FileExplorer from "@/app/components/fileExplorer/FileExplorer";
import InfiniteScroll from "@/app/components/infinitescroll/InfiniteScroll";
import Pagination from "@/app/components/pagination/Pagination";
import PersonSearch from "@/app/components/personSearch/PersonSearch";
import ResizeWindow from "@/app/components/resizeWindow/ResizeWindow";
import TickTacToe from "@/app/components/tictactoe/TicTacToe";
import EmailDashboard from "@/app/components/emailDashboard/EmailDashboard";
import MultiSelect from "../components/multiSelect/MultiSelect";
import Modal from "@/app/components/modal/Modal";
import DynamicTable from "@/app/components/dynamictable/DynamicTable";
import Todos from "@/app/components/todos/Todos";

export const playgroundItems = [
  {
    id: "modal",
    title: "Modal without Portal",
    component: Modal,
    level: "easy",
  },
  {
    id: "Todos",
    title: "TODO's - CURD Operation",
    component: Todos,
    level: "easy",
  },
  {
    id: "Dynamic Table",
    title: "Dynamic Table - ( Render based on Api's Data)",
    component: DynamicTable,
    level: "medium",
  },
  {
    id: "multi-select",
    title: "Multi Select Dropdown with Search & Tags",
    component: MultiSelect,
    level: "medium",
  },
  {
    id: "file-explorer",
    title: "Recursive File Explorer with Folder Structure",
    component: FileExplorer,
    level: "hard",
  },
  {
    id: "infinite-scroll",
    title: "Infinite Scroll with Lazy Data Loading",
    component: InfiniteScroll,
    level: "medium",
  },
  {
    id: "pagination",
    title: "Client Side Pagination with Page Controls",
    component: Pagination,
    level: "easy",
  },
  {
    id: "person-search",
    title: "Person Search with Debounce & Filtering",
    component: PersonSearch,
    level: "medium",
  },
  {
    id: "resize-window",
    title: "Window Resize Listener with Responsive State",
    component: ResizeWindow,
    level: "easy",
  },
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe Game with Winning Logic",
    component: TickTacToe,
    level: "easy",
  },
  {
    id: "email-dashboard",
    title: "Email Dashboard with Read, Filter & Selection",
    component: EmailDashboard,
    level: "hard",
  },
];
