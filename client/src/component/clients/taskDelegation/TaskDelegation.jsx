import React from "react";

const TaskDelegation = () => {
  const [selectedItem, setSelectedItem] = useState("Home");

  const renderContent = () => {
    switch (selectedItem) {
      case "Home":
        return <Home />;
      case "Doer's List":
        return <DoersList />;
      case "Add Doer":
        return <AddDoer />;
      case "Delegate Task":
        return <DelegateTask />;
      case "Task List":
        return <TaskList />;
      default:
        return <Home />;
    }
  };
  const [doers, setDoers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newDoer, setNewDoer] = useState("");
  const [newTask, setNewTask] = useState("");
  const [selectedDoer, setSelectedDoer] = useState("");

  useEffect(() => {
    fetchDoers();
    fetchTasks();
  }, []);

  const fetchDoers = async () => {
    try {
      const res = await axios.get(
        "https://taskelegationpiyush-4.onrender.com/doers"
      ); // Fixed typo
      setDoers(res.data);
      console.log(res.data); // Fixed incorrect logging
    } catch (error) {
      console.log(error.toString()); // Fixed incorrect error variable
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "https://taskelegationpiyush-4.onrender.com/tasks"
      );
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const addDoer = async () => {
    if (!newDoer.trim()) return;
    try {
      await axios.post("https://taskelegationpiyush-4.onrender.com/doers", {
        name: newDoer,
      }); // Fixed typo
      setNewDoer("");
      fetchDoers();
    } catch (error) {
      console.error("Error adding doer", error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim() || !selectedDoer) return;
    try {
      await axios.post("https://taskelegationpiyush-4.onrender.com/tasks", {
        name: newTask,
        doer: selectedDoer,
      });
      setNewTask("");
      setSelectedDoer("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  return (
    <div>
      <div className="app-container">
        <SideBar setSelectedItem={setSelectedItem} />
        <div className="content-container">{renderContent()}</div>
      </div>
    </div>
  );
};

export default TaskDelegation;
