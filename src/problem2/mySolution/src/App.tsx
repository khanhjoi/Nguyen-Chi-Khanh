import { useState } from "react";
import Form from "./components/form/Form";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-1/2 h-[20rem] bg-slate-100 mx-auto translate-y-1/2">
        <Form />
      </div>
    </>
  );
}

export default App;
