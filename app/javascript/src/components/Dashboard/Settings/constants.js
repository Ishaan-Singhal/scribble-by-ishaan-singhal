import General from "./General";
import ManageCategory from "./ManageCategories";
import Redirections from "./Redirections";

export const REDIRECTION_INITIAL_VALUES = {
  id: "",
  from: "",
  to: "",
};

export const REDIRECTION_VALUES = [
  {
    id: "1",
    from: "/welcome",
    to: "/",
  },
  {
    id: "2",
    from: "/about",
    to: "/about-us",
  },
];

export const CATEGORIES = [
  {
    id: 5,
    title: "Getting Started",
  },
  {
    id: 1,
    title: "Apps & Integration",
  },
  {
    id: 2,
    title: "Security & Privacy",
  },
  {
    id: 3,
    title: "Misc",
  },
  {
    id: 4,
    title: "Category X",
  },
];

export const SETTINGS_NAVLINKS = [
  {
    key: "general",
    description: "Page Title, Brand Name & Meta Descriptions ",
    label: "General",
    path: "/settings?tab=general",
    component: General,
  },
  {
    key: "redirections",
    description: "Create and configure redirection rules",
    label: "Redirections",
    path: "/settings?tab=redirections",
    component: Redirections,
  },
  {
    key: "categories",
    description: "Edit & Reorder KB structure",
    label: "Manage Categories",
    path: "/settings?tab=categories",
    component: ManageCategory,
  },
];
