import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/CreateNote/SingleNote";

const App = () => {
  return (
    <>
      <Header />
      <main className="App">
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/login" exact element={<LoginScreen />} />
          <Route path="/signup" exact element={<RegisterScreen />} />
          <Route path="/createnote" exact element={<CreateNote />} />
          <Route path="/note/:id" exact element={<SingleNote />} />
          <Route path="/mynotes" element={<MyNotes />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
