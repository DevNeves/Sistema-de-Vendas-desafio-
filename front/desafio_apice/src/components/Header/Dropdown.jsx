import './Dropdown.css';

import { useState, useRef, useEffect } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

import { Link } from 'react-router-dom';

const Dropdown = ({ title, itens }) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleMouseOver = (e) => {
      const mouseIsOut = ref.current;
      const notDropChild = !ref.current.contains(e.target);

      if (mouseIsOut && notDropChild) {
        setIsActive(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
  }, [ref]);

  return (
    <div className="dropdown" ref={ref}>
      <div className="dropdown__title" onClick={() => setIsActive(!isActive)}>
        {title}
        <span>
          <IoMdArrowDropdown />
        </span>
      </div>
      {isActive && (
        <div className="dropdown__content">
          {itens.map((iten, i) => (
            <Link key={i} to={iten.link}>
              <div className="dropdown__item">{iten.title}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
