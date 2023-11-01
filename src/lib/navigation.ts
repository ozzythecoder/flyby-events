type Link = {
  name: string;
  url: string;
  target: "_self" | "_blank"; // _self opens in current window, _blank opens in new window
};

export const links: Link[] = [
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
    name: "Events",
    url: "#",
    target: "_self"
  },
  {
    name: "Notifications",
    url: "#",
    target: "_self"
  },
  {
    name: "An external link",
    url: "#",
    target: "_blank",
  },
];
