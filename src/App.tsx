import { useEffect, useState } from "react";
import { fetchHello } from "./api/hello";

type State =
  | { kind: "loading" }
  | { kind: "ready"; message: string }
  | { kind: "error"; error: string };

function App() {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    fetchHello()
      .then((message) => setState({ kind: "ready", message }))
      .catch((err: unknown) => setState({ kind: "error", error: err instanceof Error ? err.message : String(err) }));
  }, []);

  return (
    <main>
      {state.kind === "loading" && <p>Loading…</p>}
      {state.kind === "ready" && <h1>{state.message}</h1>}
      {state.kind === "error" && <p role="alert">Could not reach the API: {state.error}</p>}
    </main>
  );
}

export default App;
