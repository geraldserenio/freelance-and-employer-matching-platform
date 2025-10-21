import React from "react";
import styled from "styled-components";
import { formatText } from "../../../../helper/text-formatter";

const OverViewTable = ({ table }) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Target Audience</Th>
          <Th>Duration</Th>
          <Th>Delivery Methods</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td>
            <ul>
              {table.targetAudience.map((item, index) => (
                <li key={index}>{formatText(item)}</li>
              ))}
            </ul>
          </Td>
          <Td>{`${table.duration.weeks} weeks, ${table.duration.hoursPerWeek} hrs/week`}</Td>
          <Td>
            <ul>
              {table.deliveryMethods.map((item, index) => (
                <li key={index}>{formatText(item)}</li>
              ))}
            </ul>
          </Td>
        </tr>
      </tbody>
    </Table>
  );
};

export default OverViewTable;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left; /* Ensures text aligns properly */
`;

const Td = styled.td`
  padding: 10px;
  vertical-align: top;
  text-align: left; /* Overrides inherited center alignment */

  ul {
    padding-left: 0;
    margin: 0;
  }

  li {
    list-style-type: disc;
    margin-left: 1em;
  }
`;

const Th = styled.th`
  padding: 10px;
  text-align: left;
`;
