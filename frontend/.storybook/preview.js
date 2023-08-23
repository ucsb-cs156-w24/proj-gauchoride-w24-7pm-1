import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import "../src/index.css";
import { initialize, mswDecorator } from 'msw-storybook-addon';


import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const currentUrl = window.location.href;
const isLocalhost = currentUrl.startsWith("http://localhost:6006/");
const mockServiceWorkerUrl = isLocalhost ? "mockServiceWorker.js" : "https://" + window.location.hostname + "/mockServiceWorker.js";

initialize(
  {
    serviceWorker: {
      url: mockServiceWorkerUrl
    }
  }
);

const queryClient = new QueryClient();

// Per https://storybook.js.org/docs/react/writing-stories/decorators#context-for-mocking
// Here, we provide the context needed for some of the components,
// e.g. the ones that rely on currentUser

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    </QueryClientProvider>
  ),
  mswDecorator, // provide the MSW decorator globally
];



