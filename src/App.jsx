import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CreateReservation from "./components/Reservation/createreservation";
import Myreservation from "./components/Reservation/myreservation";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/make-reservation" element={<CreateReservation />} />
        <Route path="/ahmed" element={<div>AHmeD Page</div>} />
        <Route path="/my-reservation/:id/:email" element={<Myreservation />} />
      </Routes>
    </div>
  );
}
