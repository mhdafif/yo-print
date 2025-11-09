import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            Loading...
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  );
}

export default App;
