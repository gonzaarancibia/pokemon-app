import React, { useState, useRef, useEffect } from 'react';
import './TypeMultiSelect.scss';

export default function TypeMultiSelect({
  selectedTypes,
  onTypeToggle,
  onClearTypes,
  pokemonTypes,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getDisplayText = () => {
    if (selectedTypes.length === 0) {
      return 'Select types...';
    }
    if (selectedTypes.length === 1) {
      return selectedTypes[0];
    }
    return `${selectedTypes.length} types selected`;
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTypeClick = (type) => {
    onTypeToggle(type);
  };

  return (
    <div className="type-multi-select" ref={dropdownRef}>
      <div
        className={`type-multi-select__trigger ${
          isOpen ? 'type-multi-select__trigger--open' : ''
        }`}
        onClick={handleToggleDropdown}
      >
        <span className="type-multi-select__text">{getDisplayText()}</span>
        <div className="type-multi-select__actions">
          {selectedTypes.length > 0 && (
            <button
              className="type-multi-select__clear"
              onClick={(e) => {
                e.stopPropagation();
                onClearTypes();
              }}
              title="Clear all types"
            >
              ×
            </button>
          )}
          <span
            className={`type-multi-select__arrow ${
              isOpen ? 'type-multi-select__arrow--open' : ''
            }`}
          >
            ▼
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="type-multi-select__dropdown">
          <div className="type-multi-select__options">
            {pokemonTypes.map((type) => (
              <div
                key={type}
                className={`type-multi-select__option ${
                  selectedTypes.includes(type)
                    ? 'type-multi-select__option--selected'
                    : ''
                }`}
                onClick={() => handleTypeClick(type)}
              >
                <span className="type-multi-select__option-text">{type}</span>
                {selectedTypes.includes(type) && (
                  <span className="type-multi-select__option-check">✓</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
