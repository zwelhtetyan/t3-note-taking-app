import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Header } from "~/components/Header";
import Layout from "~/components/Layout";
import NoteEditor from "~/components/note/NoteEditor";
import Topics from "~/components/topic/Topics";

const NewNote: NextPage = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && !sessionData) {
      router.push("/");
    }
  }, [sessionData]);

  return (
    <>
      <Head>
        <title>Create New Note 📝</title>
        <meta
          name="description"
          content="create new note with syntax supported markdown editor"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Layout>
          <Topics />
          <NoteEditor />
        </Layout>
      </main>
    </>
  );
};

export default NewNote;
