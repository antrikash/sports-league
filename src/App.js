import React, { useState, useEffect } from "react";
import "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Switch } from "react-router-dom";
import Schedule from "./components/Schedule";
import LeagueService from "./services/LeagueService";
import LeaderBoard from "./components/LeaderBoard";
import ErrorScreen from "./components/ErrorScreen";

const App = () => {
  const lData =new LeagueService();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatch = async () => {
      const val = await lData.fetchData();
      setMatches(val);
    };
      fetchMatch();
  }, []);
  return (
    <>
    <Header />
    <Switch>
    <Route exact path="/">
    <Schedule matches={matches} />
   </Route>
   <Route exact path="/schedule">
    <Schedule matches={matches} />
   </Route>
   <Route exact path="/leaderboard">
    <LeaderBoard leagueData={lData} />
   </Route>
   <Route path="*">
    <ErrorScreen />
   </Route>
   </Switch>
   <Footer />
   </>
  );
};

export default App;
