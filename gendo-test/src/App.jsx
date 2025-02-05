import { useEffect, useState } from "react";
import styles from "./app.module.scss";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Search from "./components/Search";
import { IoMdCode } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import DetailGithub from "./components/DetailsGithub";
import { Octokit } from "https://esm.sh/@octokit/core@4.2.2";
import Menu from "./components/Menu";

export const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
});

function App() {
  const [step, setStep] = useState(0);
  const [repos, setRepos] = useState();
  const [starred, setStarred] = useState();
  const [profile, setProfile] = useState();
  const [filteredRepos, setFilteredRepos] = useState();
  const [filteredStarred, setFilteredStarred] = useState();
  const user = "mosaviczki";

  const handleRepos = () => setStep(0);
  const handleStarred = () => setStep(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: repos } = await octokit.request(
          `GET /users/${user}/repos`
        );
        setRepos(repos);
        setFilteredRepos(repos);

        const { data: starred } = await octokit.request(
          `GET /users/${user}/starred`
        );
        setStarred(starred);
        setFilteredStarred(starred);

        const { data: profile } = await octokit.request(`GET /users/${user}`);
        setProfile(profile);
      } catch (error) {
        console.error("Err:", error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (text) => {
    switch (step) {
      case 0:
        console.log("1");
        if (text === "") {
          setFilteredRepos(repos);
        } else {
          const newFilter = repos.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
          );
          setFilteredRepos(newFilter);
        }
        break;
      case 1:
        console.log("2");
        if (text === "") {
          setFilteredStarred(starred);
        } else {
          const newFilter = starred.filter((item) =>
            item.name.toLowerCase().includes(text.toLowerCase())
          );
          setFilteredStarred(newFilter);
        }
        break;
      default:
        return;
    }
  };

  return (
    <div className={styles.containerMain}>
      <Header />
      <main className={styles.contentMain}>
        {filteredRepos && starred && profile && (
          <>
            <div className={styles.profile}>
              <Profile infos={profile} />
            </div>
            <div className={styles.detailGithub}>
              <Menu
                step={step}
                handleRepos={handleRepos}
                handleStarred={handleStarred}
                reposLength={repos.length}
                starredLength={starred.length}
              />
              <div className={styles.contentGithub}>
                <Search onSearch={handleSearch} />
                {step === 0 ? (
                  <DetailGithub
                    list={filteredRepos}
                    icon={<IoMdCode />}
                    type={"repos"}
                  />
                ) : (
                  <DetailGithub
                    list={filteredStarred}
                    icon={<FaStar />}
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
