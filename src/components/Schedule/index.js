import React from "react";
import { scheduleData } from "./helpers";
import "./Schedule.css";

const Schedule = (props) => {

  const renderTable = () => {
    return (
      <table className="scheduleTable">
        <thead>
          <tr>
            {scheduleData.map(({ heading , colClass}) => (
              <th key={heading} className={colClass}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {props.matches.map((rowData, i) => {
            return (
              <tr key={i} className="bodyRow">
                {scheduleData.map(({ keyToSearch, handler, colClass }, index) => {
                  return <td className={colClass} key={index}>{handler(keyToSearch, rowData)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  return (
    <>
      <header className="headingText">League Schedule</header>
      <>{renderTable()}</>
    </>
  );
};

export default Schedule;
