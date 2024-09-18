import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-3 bg-slate-600 ">
      <h1>Logo</h1>

      <nav className="flex gap-4 text-white">
        <Link to={"/"}>Home</Link>
        <Link to={"/ahmed"}>Ahmed</Link>
        <Link to={"/make-reservation"}>make-reservation</Link>
      </nav>
    </header>
  );
}
