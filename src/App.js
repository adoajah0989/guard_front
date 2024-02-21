import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import PatroliList from "./components/PatroliList";
import AddPatroli from "./components/AddPatroli";
import Sevenbox from "./components/sevenBox";
import GuestView from "./components/GuestView";
import EditPatroli from "./components/EditPatroli";
import Footer from "./components/footer";
import LapdiView from "./components/LabdiView";
import LapdiForm from "./components/lapdiForm";
import MutasiView from "./components/mutasiView";
import BAPList from "./components/BAPList";
import Darurat from "./components/darurat/darurat";
import ExpedisiView from "./components/ExpedisiView";
import AssetView from "./components/AssetView";
import AddDarurat from "./components/darurat/addDarurat";
import InOutViews from "./components/inOutView";
import Sidebar from "./components/sidebar";
import sevenBox from "./components/sevenBox";
import FloatingSidebar from "./components/FloatingSidebar";
import { Container, Row, Col } from "react-bootstrap";

// Higher-Order Component for wrapping a page with Navbar
const withNavbar = (Component) => () =>
  (
    <>
      <Navbar />
      <Container>
      <div style={{ position: 'fixed', top: '70px', left: '10px', zIndex: '100' }}>
            <FloatingSidebar />

          </div>
          <Component />
      </Container>
    </>
  );
const nosidebar = (Component) => () =>
  (
    <>
      <Navbar />
      <Component />
      <Footer />
    </>
  );

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={nosidebar(sevenBox)} />
        <Route path="/patroli" component={withNavbar(PatroliList)} />
        <Route path="/inout" component={withNavbar(InOutViews)} />
        <Route path="/tamu" component={withNavbar(GuestView)} />
        <Route path="/lapdi" component={withNavbar(LapdiView)} />
        <Route path="/patroli/add" component={withNavbar(AddPatroli)} />
        <Route path="edit/:id" component={withNavbar(EditPatroli)} />
        <Route path="/mutasi" component={withNavbar(MutasiView)} />
        <Route path="/bap" component={withNavbar(BAPList)} />
        <Route path="/addDarurat" component={withNavbar(AddDarurat)} />
        <Route path="/darurat" component={withNavbar(Darurat)} />
        <Route path="/ekspedisi" component={withNavbar(ExpedisiView)} />
        <Route path="/asset" component={withNavbar(AssetView)} />
        <Route path="/test" component={Sidebar} />
      </Switch>
    </Router>
  );
}

export default App;
