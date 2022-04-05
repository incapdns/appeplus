import { useHistory } from "react-router-dom";
import Routes from "./Routes/Routes";

function App() {
  (window as any)['root_history'] = useHistory();

  return (
    <Routes />
  );
}

export default App;
