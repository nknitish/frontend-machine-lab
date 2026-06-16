import React, { useState } from "react";

const AccordianItem = ({ item, open, onToggle }) => {
  return (
    <div className="bg-white shadow-lg border border-gray-100 my-4 p-3 rounded-lg">
      <div
        className="cursor-pointer flex justify-between items-center"
        onClick={() => onToggle(item.id)}
      >
        <p className=" text-gray-800">{item.title}</p>
        {open ? <span> &#9650;</span> : <span>&#9660;</span>}
      </div>
      {open && <div className="mt-3">{item.content}</div>}
    </div>
  );
};

const Accordion = ({ Items, allowMultiple }) => {
  const [openItems, setOpenItems] = useState([]);

  const handeToggle = (id) => {
    if (allowMultiple) {
      setOpenItems((prevOpenItems) =>
        prevOpenItems.includes(id)
          ? prevOpenItems.filter((itemId) => itemId !== id)
          : [...prevOpenItems, id],
      );
    } else {
      setOpenItems((prevOpenItems) => (prevOpenItems.includes(id) ? [] : [id]));
    }
  };

  return (
    <div>
      {Items.map((item) => (
        <AccordianItem
          key={item.id}
          item={item}
          onToggle={handeToggle}
          open={openItems.includes(item.id)}
        />
      ))}
    </div>
  );
};

const App = () => {
  const faqItems = [
    {
      id: "1",
      title: "What is React?",
      content:
        "React is a popular JavaScript library for building user interfaces, particularly single-page applications. It was developed by Facebook and allows developers to create reusable UI components that efficiently update and render when data changes.",
    },
    {
      id: "2",
      title: "How does useState work?",
      content:
        "useState is a React Hook that allows you to add state to functional components. It returns an array with two elements: the current state value and a function to update it. When you call the update function, React re-renders the component with the new state value.",
    },
    {
      id: "3",
      title: "What are React Hooks?",
      content:
        "React Hooks are functions that let you use state and other React features in functional components. Common hooks include useState, useEffect, useContext, and useRef. They were introduced in React 16.8 to provide a more direct API to React concepts.",
    },
    {
      id: "4",
      title: "What is the Virtual DOM?",
      content:
        "The Virtual DOM is a lightweight copy of the actual DOM that React maintains in memory. When state changes occur, React creates a new Virtual DOM tree, compares it with the previous one (diffing), and only updates the parts of the real DOM that have changed. This makes React very efficient.",
    },
    {
      id: "5",
      title: "What is JSX?",
      content:
        "JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code in your JavaScript files. JSX makes it easier to write and understand React components by providing a familiar syntax for describing UI structures.",
    },
  ];

  return (
    <div>
      <p className="font-bold text-2xl">Accordian Demo</p>
      <Accordion Items={faqItems} allowMultiple={false} />
      <p className="font-bold text-2xl">Accordian with Multiple Open Items</p>
      <Accordion Items={faqItems} allowMultiple={true} />
    </div>
  );
};

export default App;
