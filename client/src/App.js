import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import Profile from "./components/Profile";
import Results from "./components/Results";
import StudentDet from "./components/StudentDet";
import StudentRes from "./components/StudentRes";
import MainStud from "./components/MainStud";
import Mainteach from "./components/Mainteach";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="form1" element={<Form1 />} />
          <Route path="form2" element={<Form2 />} />
          <Route path="results" element={<Results />} />
          <Route path="studentdet" element={<StudentDet />} />
          <Route path="studentres" element={<StudentRes />} />
          <Route path="mainstud" element={<MainStud />} />
          <Route path="mainteach" element={<Mainteach />} />
      </Routes>
    </BrowserRouter>
  );
}