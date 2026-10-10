import { RouterProvider } from "react-router";
import { router } from "./routers";
import { AppProviders } from "./providers/AppProviders";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
