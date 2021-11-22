import * as Sentry from "@sentry/react";
import {Integrations} from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: "https://0ea9dea677f7430a937fc58b56ab90bd@o1070719.ingest.sentry.io/6066965",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};