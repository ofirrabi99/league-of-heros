import { UseToastOptions } from "@chakra-ui/react";

export const Links = [
  { name: "Admin - Teams", href: "/admin/teams" },
  { name: "Admin - Add Team", href: "/admin/teams/add" },
  { name: "Admin - Games", href: "/admin/games" },
  { name: "Admin - Add Game", href: "/admin/games/add" },
  { name: "My Team", href: "/my-team" },
];

export const GENERAL_ERROR_TOAST: UseToastOptions = {
  title: "Oops... Something wrong happend.",
  description: "Please try again!",
  status: "error",
};
