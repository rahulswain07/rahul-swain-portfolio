import React, { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar, Intro, Hero, PersonalStatement, About, Origin, Explore, Vision, Process, BuildInPublic, ContentCreation, Videos, Connect, CommunityFooter } from "./components";

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const done = useCallback(() => setIntroDone(true), []);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      AnimatePresence,
      { mode: "wait" },
      !introDone && React.createElement(Intro, { onDone: done }),
    ),
    React.createElement(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: introDone ? 1 : 0.15 },
        transition: { duration: .8 },
      },
      React.createElement(Navbar),
      React.createElement(
        motion.main,
        null,
        React.createElement(Hero),
        React.createElement(PersonalStatement),
        React.createElement(About),
        React.createElement(Origin),
        React.createElement(Explore),
        React.createElement(Vision),
        React.createElement(Process),
        React.createElement(BuildInPublic),
        React.createElement(ContentCreation),
        React.createElement(Videos),
        React.createElement(Connect),
        React.createElement(CommunityFooter),
      ),
    ),
  );
}