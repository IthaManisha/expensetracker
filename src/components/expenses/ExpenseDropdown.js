import React, { useState } from "react";

const Dropdown = (props) => {
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option

  const handleSelectChange = (event) => {
    const selectedCategory = event.target.value;
        setSelectedOption(selectedCategory);
        props.onSelect(selectedCategory);
  };

  return (
    <div>
      <label>Category:</label>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select an option</option>
        <option value="Food">Food</option>
        <option value="Petrol">Petrol</option>
        <option value="Salary">Salary</option>
      </select>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
};

export default Dropdown;
