import heIL from "./he-IL.json";
import enUS from "./en-US.json";

export const messages = {
  "he-IL": heIL,
  "en-US": enUS,
};

export const languages = [
  {
    id: "he-IL",
    name: "עברית",
  },
  {
    id: "en-US",
    name: "English",
  },
];

export function getDirection(locale: string) {
  if (locale === "he-IL") {
    return "rtl";
  }

  return "ltr";
}
