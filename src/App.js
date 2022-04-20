import styles from "./App.module.scss";
import Navbar from "./Components/Navbar/Index";
import Drawer from "./Components/Drawer/Index";

import EthTokens from "./Static/EthTokens"

import SettingsIcon from "./assets/icons/setting.svg";
import ExtraData from "./Components/ExtraData/Index";
import { useEffect, useState } from "react";
import { useMoralis, useOneInchTokens } from "react-moralis";

function App() {
  const [toToken, setToToken] = useState();
  const [fromToken, setFromToken] = useState({});
  const [toTokenValue, setToTokenValue] = useState(0);
  const [fromTokenValue, setFromTokenValue] = useState(0);
  const [chain, setChain] = useState("eth")

  // const { data } = useOneInchTokens({ chain }, { autoFetch: true });
  const { isInitialized, enableWeb3, isWeb3Enabled } = useMoralis();

  const fromTokenValueHandler = (e) => {
    setFromTokenValue(e.target.value);
  };

  useEffect(() => {
    if (EthTokens.tokens) {
      // const availableTokens = { ...data };
      const availableTokens = { ...EthTokens };
      console.log(availableTokens);

      setFromToken(
        availableTokens.tokens["0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"]
      );

      const tokens = [];
      for (const address in availableTokens.tokens) {
        tokens.push(availableTokens.tokens[address]);
      }
    }
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, [ isWeb3Enabled]);

  return (
    <>
      <Navbar />
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <div className={styles.SwapComponent}>
            <div className={styles.SwapComponentHeader}>
              <span>Swap</span>
              <img src={SettingsIcon} alt="settings" />
            </div>
            <Drawer
              status={"From"}
              balance={0}
              value={fromTokenValue}
              valueHandler={fromTokenValueHandler}
              token={fromToken}
            />
            <Drawer
              status={"To"}
              balance={0}
              value={toTokenValue}
              valueHandler={fromTokenValueHandler}
              token={toToken}
            />
            <ExtraData title="Exchange Rate" value={"-"} />
            <div className={styles.hr}></div>
            <ExtraData title="Expected slippage" value={"-"} />
            <ExtraData title="Minimum received" value={"-"} />
            <ExtraData title="Swap Fee" value={"1%"} />
            <button>Swap</button>
          </div>
        </header>
      </div>
    </>
  );
}

export default App;
