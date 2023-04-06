import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";
import TopicContextProvider from "~/context/TopicContext";

import "~/styles/globals.css";
import "~/styles/prism.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <TopicContextProvider>
        <Component {...pageProps} />
      </TopicContextProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
