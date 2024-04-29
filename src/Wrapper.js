import MiniProvider from "./context/MiniProvider";
import Router from "./Router";
export default function Wrapper() {
  return (
    <MiniProvider>
      <Router />
    </MiniProvider>
  );
}
