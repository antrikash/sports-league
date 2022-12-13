/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { leaderBoardData } from "./leaderBoardhelper";
import "./LeaderBoard.css";

const LeaderBoard = (props) => {
  const [board, setboard] = useState([]);
  useEffect(() => {
    const fetchBoard = async () => {
      const data = await props.leagueData.getLeaderboard();
      setboard(data);
    };
    fetchBoard();
  }, [props.leagueData]);

  const renderTable = () => {
    return (
      <table className="scheduleTable">
        <thead>
          <tr>
            {leaderBoardData.map((boardItem, index) => {
              return (
                <th key={index + 1} className={boardItem.colClass}>
                  {boardItem.heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {board.map((rowData, i) => {
            return (
              <tr key={i} className="bodyRow">
                {leaderBoardData.map(
                  ({ keyToSearch, handler, colClass }, index) => {
                    return (
                      <td className={colClass} key={index}>
                        {handler(keyToSearch, rowData)}
                      </td>
                    );
                  }
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <header className="headingText">League Standings</header>
      <>{renderTable()}</>
    </>
  );
};

export default LeaderBoard;
