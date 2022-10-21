import General from "./General";
import ManageCategory from "./ManageCategories";
import Redirections from "./Redirections";

export const REDIRECTION_INITIAL_VALUES = {
  id: "",
  from: "",
  to: "",
};

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
