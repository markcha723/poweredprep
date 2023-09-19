import React, { useEffect, useReducer } from "react";
import { json, defer, useLoaderData } from "react-router-dom";
import Header from "../../Components/Main/Header/Header";
import Study from "../../Components/Main/StudyView/Study";

const SamplePage = () => {
  const { questions } = useLoaderData("sample-page");

  return (
    <main>
      <Header />
      <Study />
    </main>
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
    console.log(resData);
    return resData;
  }
};

export const loader = async ({ request, params }) => {
  return defer({
    questions: await loadQuestions(),
  });
};
