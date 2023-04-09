import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Header } from "~/components/Header";
import Layout from "~/components/Layout";
import NoteEditor from "~/components/note/NoteEditor";
import Spinner from "~/components/Spinner";
import { api } from "~/utils/api";

const Edit = () => {
  const router = useRouter();

  const { data: topic, isLoading: loadingTopic } = api.topic.getTopic.useQuery(
    { topicName: router.query.topicName as string },
    {
      enabled: router.query.topicName !== undefined,
      onError: (err) => console.log(err),
    }
  );

  const { data: note, isLoading: loadingNote } = api.note.getNote.useQuery(
    {
      noteId: router.query.noteId as string,
      topicName: router.query.topicName as string,
    },
    {
      enabled: router.query.noteId !== undefined,
      onError: (err) => console.log(err),
    }
  );

  useEffect(() => {
    // !topic || !note === !(topic && note);
    if (!loadingTopic && !loadingNote && !(topic && note)) {
      router.push("/");
    }
  }, [loadingTopic, loadingNote]);

  console.log({ topic, note });

  return (
    <>
      <Head>
        <title>Edit Note 📝</title>
        <meta
          name="description"
          content="create new note with syntax supported markdown editor"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Layout>
          <>
            <div className="col-span-1 border-r border-r-neutral-focus p-4">
              {!loadingTopic && topic ? (
                <div className="btn-secondary btn rounded bg-neutral-focus">
                  {topic.title}
                </div>
              ) : (
                <Spinner />
              )}
            </div>

            {!loadingNote && note && <NoteEditor editMode noteToEdit={note} />}
          </>
        </Layout>
      </main>
    </>
  );
};

export default Edit;
