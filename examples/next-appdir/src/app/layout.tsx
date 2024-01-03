import type { ReactNode } from "react";

import { RootProvider } from "~/app/_provider";

type Props = {
  children?: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
