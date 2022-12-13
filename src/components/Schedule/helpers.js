import moment from "moment";
import Flag from "./flag";

const getValue = (key, data) => data[key];
const formatDate = (key, data) => {
  let d = new Date(data[key]);
  return moment(d).format("D.M.YYYY hh:mm");
};
const getScore = (keys, data) => {
  const scores = keys.map((v) => data[v]);
  const [homeScore, awayScore] = scores;
  return `${homeScore}:${awayScore}`;
};
const getTeam = (isReverse) => (key, data) => {
  return <Flag isReverse={isReverse} country={data[key]} />;
};
const scheduleData = [
  {
    heading: "Date/Time",
    keyToSearch: "matchDate",
    handler: formatDate,
    colClass: "dateCol",
  },
  {
    heading: "Stadium",
    keyToSearch: "stadium",
    handler: getValue,
    colClass: "stadiumCol",
  },
  {
    heading: "Home Team",
    keyToSearch: "homeTeam",
    handler: getTeam(),
    colClass: "homeTeamCol",
  },
  {
    heading: " ",
    keyToSearch: ["homeTeamScore", "awayTeamScore"],
    handler: getScore,
    colClass: "scoreCol",
  },
  {
    heading: "Away Team",
    keyToSearch: "awayTeam",
    handler: getTeam(true),
    colClass: "awayTeamCol",
  },
];

export { scheduleData };
