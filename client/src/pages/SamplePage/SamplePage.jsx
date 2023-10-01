import React, { Suspense } from "react";
import { json, defer, useLoaderData, Await } from "react-router-dom";
import Study from "../../Components/Main/StudyView/Study";
import ErrorPage from "../ErrorPage/ErrorPage";

const SamplePage = () => {
  const { questions } = useLoaderData("sample-page");

  return (
    <Suspense fallback={<p>loading...</p>}>
      <Await
        resolve={questions}
        errorElement={<ErrorPage sendTo="/" destinationText="back" />}
      >
        {(questions) => <Study questionSet={questions} />}
      </Await>
    </Suspense>
  );
};

export default SamplePage;

//dummy fetch. should be made to a custom endpoint later.
const loadQuestions = async () => {
  const response = await fetch("/questions");
  if (!response.ok) {
    json(
      { message: "Could not fetch data. Please contact admin." },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
};

export const loader = async ({ request, params }) => {
  return defer({
    questions: await loadQuestions(),
  });
};
