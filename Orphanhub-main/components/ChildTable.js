// src/components/ChildTable.js
import React from 'react';
import ChildTableRow from './ChildTableRow';

const ChildTable = () => {
  return (
    <div className="table-container">
      {/* Add your child table content here */}
      <ChildTableRow />
      <button id="addRowBtn">Add New Row</button>
    </div>
  );
};

export default ChildTable;
