import type { Dictionary } from "../../types";
import { core } from "./core";
import { marketing } from "./marketing";
import { auth } from "./auth";
import { shell } from "./shell";
import { dashboard } from "./dashboard";
import { dashboardB } from "./dashboardB";

export const en: Dictionary = {
  ...core,
  ...marketing,
  ...auth,
  ...shell,
  ...dashboard,
  ...dashboardB,
};
