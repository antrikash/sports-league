import Flag from "../Schedule/flag";

const getValue = (key, data) => data[key];
const getTeam = (isReverse) => (key, data) => {
    return <Flag isReverse={isReverse} country={data[key]} />;
  };
const leaderBoardData = [
  {
    heading: "Team Name",
    keyToSearch: "teamName",
    colClass: "teamNameCol",
    handler: getTeam(true),
  },
  {
    heading: "MP",
    keyToSearch: "matchesPlayed",
    colClass: "mPCol",
    handler: getValue,
  },
  {
    heading: "GF",
    keyToSearch: "goalsFor",
    colClass: "gFCol",
    handler: getValue,
  },
  {
      heading: "GA",
      keyToSearch: "goalsAgainst",
      colClass: "gACol",
      handler: getValue,
  },
  {
    heading: "GD",
    keyToSearch: "goalDifference",
    colClass: "gDCol",
    handler: getValue,
  },
  {
    heading: "Points",
    keyToSearch: "points",
    colClass: "pointsCol",
    handler: getValue,
  },
];

export { leaderBoardData };
