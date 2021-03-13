import React, { useState } from 'react';

const Select = () => {
  const [flavor, setFlavor] = useState('grape');
  const onChange = (e) => {
    setFlavor(e.target.value);
  };
  const onClick = (e) => {
    alert(flavor);
    // e.preventDefault();
  };
  return (
    <div>
      <form>
        <label>
          Pick your favorite flavor:&nbsp;&nbsp;
          <select name="flavor" value={flavor} onChange={onChange}>
            <option value="grape">grape</option>
            <option value="apple">apple</option>
            <option value="mango">mango</option>
          </select>
        </label>
        <input type="submit" value="제출" onClick={onClick} />
      </form>
    </div>
  );
};

export default Select;
