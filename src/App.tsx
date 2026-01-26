import {RootLayout} from "multi-channel-core";
import './multi-channel-core.css'
import MorningMessageMainPage from "./pages/MorningMessageMainPage/MorningMessageMainPage";
import './i18n/config';

function App() {
  return (
    <RootLayout>
      <MorningMessageMainPage />
    </RootLayout>
  );
}

export default App;
