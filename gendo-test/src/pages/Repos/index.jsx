import { Octokit } from "https://esm.sh/@octokit/core@4.2.2";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import Header from "../../components/Header";
import { CiFileOn } from "react-icons/ci";
import { GoFileDirectoryFill } from "react-icons/go";
import { IoBookOutline } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

export const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
});

export default function Repos() {
  const { owner, repository } = useParams();
  const [paths, setPath] = useState([]);
  const [textReadme, setTextReadme] = useState("");
  const [loading, setLoading] = useState(true);

  const processHTMLToMarkdown = (text) => {
    return text.replace(
      /<img.*?alt="(.*?)".*?src="(.*?)".*?>/g,
      (_, alt, src) => `![${alt}](${src})`
    );
  };

  useEffect(() => {
    if (owner && repository) {
      async function fetchData() {
        try {
          const { data } = await octokit.request(
            `GET /repos/${owner}/${repository}/contents`
          );
          setPath(data);

          const { data: readme } = await octokit.request(
            `GET /repos/${owner}/${repository}/contents/README.md`
          );

          const readmeContent = new TextDecoder("utf-8").decode(
            Uint8Array.from(atob(readme.content), (c) => c.charCodeAt(0))
          );

          const processedContent = processHTMLToMarkdown(readmeContent);

          setTextReadme(processedContent);
          setLoading(false);
        } catch (error) {
          console.error("Err:", error);
        }
      }
      fetchData();
    }
  }, [owner, repository]);

  return (
    <div className={styles.containerRepository}>
      {paths.length > 0 && (
        <>
          <Header />
          {loading && (
            <div className={styles.loading}>
              <img
                src="https://github.githubassets.com/images/mona-loading-dimmed.gif"
                alt="loading-github"
                className={styles.imageLoading}
              />
            </div>
          )}
          {!loading && (
            <>
              <div className={styles.diretory}>
                <table className={styles.containerTable}>
                  <tbody>
                    {paths.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          {item.type === "file" ? (
                            <CiFileOn />
                          ) : (
                            <GoFileDirectoryFill />
                          )}
                        </td>
                        <td>{item.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.containerReadme}>
                <div className={styles.readme}>
                  <div className={styles.headerReadme}>
                    <IoBookOutline />
                    <p>README</p>
                  </div>
                  <hr />
                  <div className={styles.textReadme}>
                    {textReadme && <ReactMarkdown>{textReadme}</ReactMarkdown>}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
