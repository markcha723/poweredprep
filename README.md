# poweredprep - an ai-assisted test prep tool

## Table of Contents

- [Getting Started](#getting-started)
- [Features at a Glance](#features-at-a-glance)
- [Technologies Used](#technologies-used)
- [Road Map](#road-map)
- [License](#license)
- [Credits](#credits)
- [Thanks](#thanks)

## Getting Started

This project is currently still being developed. The directory is currently split into two directories, one for the client and one for the server. Here's what you'll need to do to run it:

in /client:

> npm install
> npm start

In /server, things are more complicated. You'll need to create some environmental local variable keys. When you have those, though, you can:

> npm install
> npm run dev

## Features at a Glance

This application is meant as a tool to help teachers and students prepare for the English portion of the new (2023) digital SAT exam. Changes to the format -- shorter passages with a dynamic difficulty curve -- have made it very amenable to the types of reading that LLMs such as GPT3.5 can produce to a decent quality.

-A fully-featured question study module that works in different modes -- studying, testing, editing -- and supplies basic features that would be useful in each context e.g. being able to look up words while studying passages.
-Students can select and configure types of questions from a pre-approved database of GPT-generated questions. The questions can be graded and stored for review or for analysis by the teachers.
-Teachers can either submit their own, human-generated questions or use a configuration menu to have GPT3.5 respond back with a requested number of generated questions.

## Technologies Used

in /client:

> React, react-router, HTML, CSS.

in /server:

> Node.js, MongoDB, mongoose, Typescript.

## Road Map

This software is currently in development. Here is a roadmap of its current progress.

- [x] [Basic Theming]
- [x] [Navigation and basic reusable components skeleton]
- [x] [Ability to configure what types of questions can be generated]
- [x] [Editor for teacher users to edit generated questions]
- [x] [Node.js backend to handle requests for generated reading questions]
- [x] [Creation of view that allows users to Study, look up words, and choose answers]
- [x] [Integration of back end with frontend Study view]
- [ ] [Allowing users to configure what types of questions they want to study]
- [ ] [Routing]
- [ ] [Authentication]
- [ ] [Project cleanup and reconsideration of prompt structure]
- [ ] [Test component and logic]
- [ ] [Dashboards with basic information]
- [ ] [version 1.0]

If you'd like to give any of these a shot feel free to _contribute_.

## License

No part of this repo made be used outside of prior approval by its creator.

## Credits

poweredprep is created and maintained by Mark Cha. Please direct any inquiries to markcha723@gmail.com

## Thanks

To all my friends who've given me feedback on this project, and my students.
