import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRecipe from "./Components/UserRecipe.jsx";
import ToggleView from "./Pages/ToggleView.jsx";
import DetailRecipe from "./Components/DetailRecipe.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ToggleView />} />
          <Route path="/user/:id" element={<UserRecipe />} />
          <Route path="/recipes/:id" element={<DetailRecipe />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
