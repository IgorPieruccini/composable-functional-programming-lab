import { Task } from "./types";
import R from "ramda";

// filter complete task
// const completeTasks = R.filter<Task>((val) => val.complete);
const completeTasks = R.filter<Task>(R.where({ complete: true }));

// filter by author
