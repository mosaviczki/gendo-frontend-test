import { useState } from "react";
import styles from "./app.module.scss";
import Header from "./components/Header";
import Profile from "./components/Profile";
import DetailStarred from "./components/DetailStarred";
import DetailRepos from "./components/DetailRepos";
import Search from "./components/Search";

function App() {
  const [step, setStep] = useState(0);

  const handleRepos = () => setStep(0);
  const handleStarred = () => setStep(1);

  const listStarred = [
    {
      name: "nodejs / Release",
      description: "Simply to-do server based on Node.js",
      stack: 1404,
      fork: 177,
    },
    {
      name: "leocaseiro / angular-chosen",
      description: "Simply to-do server based on Node.js",
      stack: 1404,
      fork: 177,
    },
    {
      name: "LFeh / frontend-challenges",
      description: "Simply to-do server based on Node.js",
      stack: 1404,
      fork: 177,
    },
  ];

  const list = [
    {
      name: "todo-backend",
      description: "Simply to-do server based on Node.js",
      stack: "JavaScript",
      fork: 177,
    },
    {
      name: "dotfiles",
      description: "Simply to-do server based on Node.js",
      stack: "JavaScript",
      fork: 177,
    },
    {
      name: "console-logger",
      description: "Simply to-do server based on Node.js",
      stack: "JavaScript",
      fork: 177,
    },
  ];

  return (
    <div className={styles.containerMain}>
      <Header />
      <main className={styles.contentMain}>
        <div className={styles.profile}>
          <Profile />
        </div>
        <div className={styles.detailGithub}>
          <div className={styles.buttonOption}>
            <button
              className={`${styles.button} ${step === 0 ? styles.active : ""}`}
              onClick={handleRepos}
            >
              Repos <span className={styles.count}>73</span>
            </button>
            <button
              className={`${styles.button} ${step === 1 ? styles.active : ""}`}
              onClick={handleStarred}
            >
              Starred <span className={styles.count}>73</span>
            </button>
            <div
              className={`${styles.line} ${
                step === 0 ? styles.lineLeft : styles.lineRight
              }`}
            />
          </div>
          <div className={styles.contentGithub}>
            <Search />
            {step === 0 ? <DetailRepos list={list}/> : <DetailStarred list={listStarred}/>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
