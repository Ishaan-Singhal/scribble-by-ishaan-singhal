import Articles from "./Dashboard/Articles";
import Create from "./Dashboard/Articles/Form/Create";
import Edit from "./Dashboard/Articles/Form/Edit";
import Settings from "./Dashboard/Settings";

export const DASHBOARD_PATH = "/";
export const EUI_PATH = "/public";
export const EUI_SLUG_PATH = "/public/:slug";
export const ARTICLES_PATH = "/articles";
export const CREATE_ARTICLE_PATH = "/articles/create";
export const EDIT_ARTICLE_PATH = "/articles/:slug/edit";
export const SETTINGS_PATH = "/settings";
export const PASSWORD_PROTECTED_PATH = "/login";

export const DASHBOARD_ROUTES = [
  {
    path: ARTICLES_PATH,
    component: Articles,
  },
  {
    path: SETTINGS_PATH,
    component: Settings,
  },
  {
    path: CREATE_ARTICLE_PATH,
    component: Create,
  },
  {
    path: EDIT_ARTICLE_PATH,
    component: Edit,
  },
];
