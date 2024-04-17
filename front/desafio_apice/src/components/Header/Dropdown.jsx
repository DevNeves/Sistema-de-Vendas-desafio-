import './Dropdown.css';

import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

const Dropdown = ({ title, itens }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="dropdown">
      <div className="dropdown__title" onClick={() => setIsActive(!isActive)}>
        {title}
        <span>
          <IoMdArrowDropdown />
        </span>
      </div>
      {isActive && (
        <div className="dropdown__content">
          {itens.map((iten, i) => (
            <div key={i} className="dropdown__item">
              {iten}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
