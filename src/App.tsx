import React, { Suspense } from "react";
import { useHistory } from "react-router-dom";

const Routes = React.lazy(() => import('./Routes/Routes'))

function App() {
  (window as any)['root_history'] = useHistory();

  return (
    <Suspense fallback={<></>}>
      <Routes />
    </Suspense>
  );
}

export default App;