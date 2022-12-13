/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW AND
 *       PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 */
class LeagueService {
  constructor(token = "", version = "") {
    this.matches = [];
    this.token = token;
    this.version = version;
    this.leaderBoard = {};
  }

  async initialise() {
    const tok = await LeagueService.getToken();
    const ver = await LeagueService.getVersion();
    return new LeagueService(tok, ver);
  }

  static async getToken() {
    if (!this.token) {
      await fetch(" http://localhost:3001/api/v1/getAccessToken")
        .then((res) => res.json())
        .then((json) => {
          this.token = `Bearer ${json.access_token}`;
        });
      return this.token;
    }
    return this.token;
  }

  static async getVersion() {
    await fetch("http://localhost:3001/api/version")
      .then((resp) => resp.json())
      .then((json) => {
        this.version = json.version;
      });
    return this.version;
  }

  getMatches() {
    return this.matches;
  }

  async fetchData() {
    const token = await LeagueService.getToken();

    if (!this.matches.length) {
      await fetch("http://localhost:3001/api/v1/getAllMatches", {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      })
        .then((resp) => resp.json())
        .then((json) => {
          this.matches = json.matches;
        });
    }
    return this.matches;
  }

  static getInitScoreCard(teamName) {
    return {
      teamName,
      matchesPlayed: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
      goalDifference: 0,
    };
  }

  static updatePoints(curTeam, oppTeam, homeTeamScore, awayTeamScore) {
    const cTeam = curTeam;
    const oTeam = oppTeam;
    if (homeTeamScore > awayTeamScore) {
      cTeam.points += 3;
    } else if (homeTeamScore < awayTeamScore) {
      oTeam.points += 3;
    } else {
      cTeam.points += 1;
      oTeam.points += 1;
    }
    return [cTeam, oTeam];
  }

  static updateDataForMatch(match) {
    const { homeTeam, awayTeam, matchPlayed, homeTeamScore, awayTeamScore } = match;
    const curTeam =
      this.leaderBoard[homeTeam] || LeagueService.getInitScoreCard(homeTeam);
    const oppTeam =
      this.leaderBoard[awayTeam] || LeagueService.getInitScoreCard(awayTeam);

    if (matchPlayed) {
      curTeam.matchesPlayed += 1;
      oppTeam.matchesPlayed += 1;
    }
    curTeam.goalsFor += homeTeamScore;
    curTeam.goalsAgainst += awayTeamScore;
    curTeam.goalDifference = curTeam.goalsFor - curTeam.goalsAgainst;
    oppTeam.goalsFor += awayTeamScore;
    oppTeam.goalsAgainst += homeTeamScore;
    const [cTeam, oTeam] = LeagueService.updatePoints(
      curTeam,
      oppTeam,
      homeTeamScore,
      awayTeamScore
    );

    this.leaderBoard[homeTeam] = cTeam;
    this.leaderBoard[awayTeam] = oTeam;
  }

  async getLeaderboard() {
    const matches = await this.fetchData()
      matches.forEach((eachMatch) => {
        LeagueService.updateDataForMatch.call(this,eachMatch);
      });
    return Object.values(this.leaderBoard);
  }
}

export default LeagueService;
