import ThemeToggle from "./ThemeToggle";

type Link = {
  name: string;
  url: string;
  target: "_self" | "_blank"; // _self opens in current window, _blank opens in new window
};

const links: Link[] = [
  {
    name: "Home",
    url: "#",
    target: "_self",
  },
  {
    name: "Test",
    url: "#",
    target: "_self",
  },
  {
    name: "About Us",
    url: "#",
    target: "_blank",
  },
];

export default function HeaderBar() {
  return (
    <div className="flex flex-col sm:flex-row mx-[15%] justify-between">
      <h2 className="text-primary-800 hover:text-primary-950 hover:underline text-3xl text-center font-heading">
        <a href="/">FLYBY events</a>
      </h2>
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
      <ThemeToggle />
    </div>
  );
}
