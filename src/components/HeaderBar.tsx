import ThemeToggle from "./ThemeToggle";
import { links } from "@/lib/navigation";

export default function HeaderBar() {
  return (
    <header className="flex flex-col sm:flex-row mx-[15%] justify-between">
      <h2 className="text-primary-800 hover:text-primary-950 hover:underline text-3xl text-center font-heading">
        <a href="/">FLYBY events</a>
      </h2>
      {/* 
      <nav className="text-primary-800 font-body font-[600]">
        <ul className="flex-row justify-evenly items-center hidden sm:flex">
          {links.map((link) => (
            <li
              key={link.name}
              className="px-4 hover:underline hover:text-primary-950"
            >
              <a target={link.target} rel="noopener noreferrer" href={link.url}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
         */}
    </header>
  );
}
