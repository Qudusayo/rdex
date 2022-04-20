// import { useMoralis } from "react-moralis";
import styles from "./Navbar.module.scss";
import polygonLogo from "./../../assets/icons/polygon-token.svg";

function Navbar({ setIsModalOpen }) {
  // const { isAuthenticated, user } = useMoralis();

  const sliceAddress = (address) => {
    return (
      address.slice(0, 6) +
      "..." +
      address.slice(address.length - 4, address.length)
    );
  };

  return (
    <nav className={styles.Navbar}>
      <h3>DEX-SWAP</h3>
      <div>
        <button className={styles.network}>
          <img src={polygonLogo} width={"25px"} style={{ marginRight: ".5em" }} />
          <span>POLYGON</span>
        </button>
        <div className={styles.userInfo}>
          {sliceAddress("0x7F01F9Af70708642bcDD9d240f018CF8B6fdAa6c")}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
