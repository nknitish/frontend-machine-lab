import { useState, useMemo } from "react";

const DEFAULT_TASK = [
  { id: 1, title: "A", priority: "low", status: "pending" },
  { id: 2, title: "B", priority: "high", status: "completed" },
  { id: 3, title: "C", priority: "medium", status: "completed" },
];

/* ================= Add Task ================= */
const NewTask = ({ addNewTask }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");

  const addTask = () => {
    if (!title.trim()) return;

    addNewTask({
      id: Date.now(),
      title,
      priority,
      status: "pending",
    });

    setTitle("");
    setPriority("low");
  };

  return (
    <div className="flex gap-2 mt-3">
      <input
        placeholder="Task name"
        className="border px-2 py-1 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="border px-2"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button onClick={addTask} className="bg-blue-500 text-white px-3">
        Add
      </button>
    </div>
  );
};

/* ================= Task List ================= */
const TaskList = ({ tasks, isAdmin, markTaskComplete }) => {
  if (!tasks.length) return <p className="mt-4">No tasks</p>;

  return (
    <ul className="mt-4">
      {tasks.map((task) => (
        <li key={task.id} className="border p-2 mb-2 flex justify-between">
          <div>
            <strong>{task.title}</strong> | {task.priority} | {task.status}
          </div>

          {isAdmin && task.status === "pending" && (
            <button
              onClick={() => markTaskComplete(task.id)}
              className="bg-green-500 text-white px-2"
            >
              Complete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

/* ================= Filters ================= */
const Filter = ({ filter, setFilter, sort, setSort }) => {
  return (
    <div className="flex gap-2 mt-4">
      <select
        className="border px-2 py-1"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <select
        className="border px-2 py-1"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="none">No Sort</option>
        <option value="lowtoHigh">Low → High</option>
        <option value="highToLow">High → Low</option>
      </select>
    </div>
  );
};

/* ================= App ================= */
const App = () => {
  const [role, setRole] = useState("admin");
  const [tasks, setTasks] = useState(DEFAULT_TASK);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("none");

  const addNewTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const markTaskComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "completed" } : t)),
    );
  };

  const processedTasks = useMemo(() => {
    let result = [...tasks];

    // Filter
    if (filter !== "all") {
      result = result.filter((t) => t.status === filter);
    }

    // Sort
    const order = { low: 1, medium: 2, high: 3 };

    if (sort === "lowtoHigh") {
      result = [...result].sort(
        (a, b) => order[a.priority] - order[b.priority],
      );
    }

    if (sort === "highToLow") {
      result = [...result].sort(
        (a, b) => order[b.priority] - order[a.priority],
      );
    }

    return result;
  }, [tasks, filter, sort]);

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Task Manager</h1>

        <select
          className="border px-2 py-1"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Add Task */}
      {role === "admin" && <NewTask addNewTask={addNewTask} />}

      {/* Filters */}
      <Filter
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />

      {/* Task List */}
      <TaskList
        tasks={processedTasks}
        isAdmin={role === "admin"}
        markTaskComplete={markTaskComplete}
      />
    </div>
  );
};

export default App;
