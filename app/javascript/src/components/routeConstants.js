import Articles from "./Dashboard/Articles";
import Create from "./Dashboard/Articles/Form/Create";
import Settings from "./Dashboard/Settings";

export const DASHBOARD_PATH = "/";
export const EUI_PATH = "/public";
export const ARTICLES_PATH = "/articles";
export const CREATE_ARTICLE_PATH = "/articles/new";
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
];
