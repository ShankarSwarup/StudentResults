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
import AddSubject from "./components/AddSubject";
import ManageSubjects from "./components/ManageSubjects";
import Editsubjects from "./components/Editsubjects";
import CombinationSubject from "./components/CombinationSubject";
import SubjectList from "./components/SubjectList";
import AddStudent from "./components/AddStudent";
import AddResults from "./components/AddResults";
import Supply from "./components/Supply";
import DetHome from "./components/DetHome";

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
          <Route path="addsub" element={<AddSubject />} />
          <Route path="subinfo" element={<ManageSubjects />} />
          <Route path="editinfo" element={<Editsubjects />} />
          <Route path="combination" element={<CombinationSubject />} />
          <Route path="sublist" element={<SubjectList />} />
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="addresults" element={<AddResults />} />
          <Route path="supply" element={<Supply />} />
          <Route path="adddet" element={<DetHome />} />
      </Routes>
    </BrowserRouter>
  );
}