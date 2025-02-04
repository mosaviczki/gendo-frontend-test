import styles from "./app.module.scss";
import Header from "./components/Header";
import Profile from "./components/Profile";

function App() {
  return (
    <div className={styles.containerMain}>
      <Header />
      <main>
        <Profile />
      </main>
    </div>
  );
}

export default App;
