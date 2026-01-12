import FileExplorer from "@/app/components/fileExplorer/page";
import InfiniteScroll from "@/app/components/infinitescroll/page";
import Pagination from "@/app/components/pagination/page";
import PersonSearch from "@/app/components/personSearch/page";
import ResizeWindow from "@/app/components/resizeWindow/page";
import TickTacToe from "@/app/components/tictactoe/page";
import EmailDashboard from "@/app/components/emailDashboard/page";

export const playgroundItems = [
  {
    id: "File Explorer",
    name: "File Explorer",
    component: FileExplorer,
  },
  {
    id: "Infinite Scroll",
    name: "Infinite Scroll",
    component: InfiniteScroll,
  },
  {
    id: "Pagination",
    name: "Pagination",
    component: Pagination,
  },
  {
    id: "PersonSearch",
    name: "PersonSearch",
    component: PersonSearch,
  },
  {
    id: "ResizeWindow",
    name: "ResizeWindow",
    component: ResizeWindow,
  },
  {
    id: "TickTacToe",
    name: "TickTacToe",
    component: TickTacToe,
  },
  {
    id: "Email Dashboard",
    name: "Email Dashboard",
    component: EmailDashboard,
  },
];
