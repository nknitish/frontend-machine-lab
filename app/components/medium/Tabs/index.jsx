import { act, useEffect, useRef, useState } from "react";
import { Button, CheckBox, Input, Radio } from "../../easy/UiComponent";

const Tabs = ({ tabs = [], active = 0, hadleTabClick }) => {
  return (
    <div className="flex justify-between gap-3">
      {tabs.map((tab, i) => (
        <button
          onClick={() => hadleTabClick(i)}
          key={tab}
          className={`${active == i ? "bg-red-500" : "bg-blue-400"} w-full  px-4 py-2 rounded-md border transition`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const TabPanel = ({ value = 0, index = 0, children }) => {
  return (
    <div
      className={`p-2 bg-white mt-2 ${value === index ? "visible" : "hidden"}`}
    >
      <div>{children}</div>
    </div>
  );
};

const App = () => {
  const tabs = ["Basic Info", "Gender", "Skills", "Preview"];
  const programmingLanguages = ["JavaScript", "React", "Python"];
  const [active, setActive] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [selectedLanguages, setSelectedLanguages] = useState(["React"]);

  const handleCheckBox = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages((prev) => prev.filter((item) => item !== language));
      return;
    }

    setSelectedLanguages((prev) => [...prev, language]);
  };

  return (
    <div className="p-10">
      <p className="font-bold text-2xl">Tabs Demo</p>

      <div className="w-[600px] border rounded-md bg-gray-300 p-2 mt-2">
        <Tabs hadleTabClick={(i) => setActive(i)} tabs={tabs} active={active} />
        <TabPanel value={active} index={0}>
          <p>Basic Details</p>
          <Input
            className="mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />

          <Input
            className="mt-3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </TabPanel>
        <TabPanel value={active} index={1}>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Select Gender </h2>
            {["Male", "female"].map((val) => (
              <Radio
                key={val}
                value={val}
                name={"Gender"}
                label={val}
                checked={val === gender}
                onChange={(e) => setGender(e.target.value)}
              ></Radio>
            ))}
          </section>
        </TabPanel>
        <TabPanel value={active} index={2}>
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Select Languages</h2>

            {programmingLanguages.map((language) => (
              <CheckBox
                key={language}
                label={language}
                checked={selectedLanguages.includes(language)}
                onChange={() => handleCheckBox(language)}
              />
            ))}
          </section>
        </TabPanel>
        <TabPanel value={active} index={3}>
          <section className="space-y-2 border-t pt-6">
            <h2 className="text-xl font-semibold">Current Values</h2>

            <p>
              <strong>Name:</strong> {name || "-"}
            </p>

            <p>
              <strong>Email:</strong> {email || "-"}
            </p>

            <p>
              <strong>Checkbox:</strong> {selectedLanguages.join(", ") || "-"}
            </p>

            <p>
              <strong> Gender:</strong> {gender}
            </p>
          </section>
        </TabPanel>
      </div>
    </div>
  );
};

export default App;
