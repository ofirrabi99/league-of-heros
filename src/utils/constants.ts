import { UseToastOptions } from "@chakra-ui/react";

export const Links = [
  { name: "Admin - Teams", href: "/admin/teams", roles: ["Admin"] },
  { name: "Admin - Add Team", href: "/admin/teams/add", roles: ["Admin"] },
  { name: "Admin - Games", href: "/admin/games", roles: ["Admin"] },
  { name: "Admin - Add Game", href: "/admin/games/add", roles: ["Admin"] },
  { name: "Admin - Game Cycle", href: "/admin/game-cycle", roles: ["Admin"] },
  { name: "My Team", href: "/my-team" },
  { name: "Leaderboard", href: "/leaderboard" },
];

export const GENERAL_ERROR_TOAST: UseToastOptions = {
  title: "Oops... Something wrong happend.",
  description: "Please try again!",
  status: "error",
};
