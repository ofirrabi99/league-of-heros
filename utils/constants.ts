import { UseToastOptions } from "@chakra-ui/react";

export const Links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Profile", href: "/profile" },
];

export const GENERAL_ERROR_TOAST: UseToastOptions = {
  title: "Oops... Something wrong happend.",
  description: "Please try again!",
  status: "error",
};

export const GENERAL_SUCCESS_TOAST: UseToastOptions = {
  title: "Your changes has been saved!",
  status: "success",
};
