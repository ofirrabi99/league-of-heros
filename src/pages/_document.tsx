import { Html, Head, Main, NextScript } from "next/document";
import { getDirection, messages } from "../lang";

export default function Document(props: any) {
  const p = props.__NEXT_DATA__;
  const locale: keyof typeof messages =
    (p.locale as keyof typeof messages) ?? "en-US";
  const dir = getDirection(locale);

  return (
    <Html lang={locale}>
      <Head />
      <body dir={dir}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
