import React, { useEffect, useReducer, Suspense } from "react";
import { json, defer, useLoaderData, Await } from "react-router-dom";
import Header from "../../Components/Main/Header/Header";
import LoadingSpinner from "../../Components/UI/LoadingSpinner/LoadingSpinner";
import Study from "../../Components/Main/StudyView/Study";
import classes from "./SamplePage.module.css";

const SamplePage = () => {
  const { questions } = useLoaderData("sample-page");

  return (
    <main className={classes.main}>
      <Header />
      <Study questionSet={questions} />
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
