import React from 'react';
import { Form } from 'react-bootstrap';

const DynamicSelect = ({ options, onSelectChange, selectedOptions }) => {
  const handleSelectChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    onSelectChange(selectedValues);
  };

  const renderNestedOptions = (options, level = 0) => {
    return options.map((option, index) => (
      <React.Fragment key={index}>
        <option value={option.value} style={{ marginLeft: `${level * 20}px` }}>
          {option.label}
        </option>
        {option.children && renderNestedOptions(option.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <Form.Select required onChange={handleSelectChange} multiple value={selectedOptions}>
      {renderNestedOptions(options)}
    </Form.Select>
  );
};

export default DynamicSelect;
