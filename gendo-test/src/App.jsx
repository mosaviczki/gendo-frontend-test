import { useEffect, useState } from "react";
import styles from "./app.module.scss";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Search from "./components/Search";
import { IoMdCode } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import DetailGithub from "./components/DetailsGithub";
import { Octokit } from "https://esm.sh/@octokit/core@4.2.2";

export const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
});

function App() {
  const [step, setStep] = useState(0);
  const [repos, setRepos] = useState();
  const [starred, setStarred] = useState([]);
  const [profile, setProfile] = useState();
  const user = 'mosaviczki';

  const handleRepos = () => setStep(0);
  const handleStarred = () => setStep(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: repos } = await octokit.request(
          `GET /users/${user}/repos`
        );
        setRepos(repos);

        const { data: starred } = await octokit.request(
          `GET /users/${user}/starred`
        );
        setStarred(starred);
        console.log(starred)

        const { data: profile } = await octokit.request(`GET /users/${user}`);
        setProfile(profile);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles.containerMain}>
      <Header />
      <main className={styles.contentMain}>
        {repos && starred && profile && (
          <>
            <div className={styles.profile}>
              <Profile infos={profile} />
            </div>
            <div className={styles.detailGithub}>
              <div className={styles.buttonOption}>
                <button
                  className={`${styles.button} ${
                    step === 0 ? styles.active : ""
                  }`}
                  onClick={handleRepos}
                >
                  Repos <span className={styles.count}>{repos.length}</span>
                </button>
                <button
                  className={`${styles.button} ${
                    step === 1 ? styles.active : ""
                  }`}
                  onClick={handleStarred}
                >
                  Starred <span className={styles.count}>{starred.length}</span>
                </button>
                <div
                  className={`${styles.line} ${
                    step === 0 ? styles.lineLeft : styles.lineRight
                  }`}
                />
              </div>
              <div className={styles.contentGithub}>
                <Search />
                {step === 0 ? (
                  <DetailGithub
                    list={repos}
                    icon={<IoMdCode />}
                    type={"repos"}
                  />
                ) : (
                  <DetailGithub
                    icon={<FaStar />}
                    list={starred}
                    type={"starred"}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
