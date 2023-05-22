import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import TodoPage from "./TodoPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/dashboard" Component={TodoPage} />
      </Routes>
    </Router>
  );
};

export default App;
