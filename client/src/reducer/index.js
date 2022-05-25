import { combineReducers } from "redux";
import login from "./loginReducer";
import list from "./listReducer";
import docs from "./docsReducer";
import home from "./homeReducer";
import member from "./memberReducer";
import project from "./projectReducer";
import mytasks from "./mytasksReducer";

export default combineReducers({
  login,
  list,
  docs,
  home,
  member,
  project,
  mytasks
});
