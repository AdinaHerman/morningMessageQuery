import {RootLayout} from "multi-channel-core";
import './i18n/config';
import 'multi-channel-core/style'
import MorningMessageMainPage from "./pages/MorningMessageMainPage/MorningMessageMainPage";

const App = () => {
  return (
    <RootLayout>
      <MorningMessageMainPage />
    </RootLayout>
  );
}

export default App;
