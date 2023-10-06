import Dashborad from "./layout/Dashboard";
import Navbar from "./layout/Navbar";
import "./App.css";
import { Container } from "semantic-ui-react";


function App() {

  return (
    <div>
      <Container>
        <Navbar/>
        <Dashborad/>
      </Container>
    </div>
  );
}

export default App;
