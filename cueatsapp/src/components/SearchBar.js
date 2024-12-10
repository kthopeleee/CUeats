// src/components/SearchBar.js

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import magnifyingglass from '../assets/NavBar_icons/magnifyingglass.png';

function SearchBar({ foodItems, diningHalls }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFood, setFilteredFood] = useState([]);
  const [filteredHalls, setFilteredHalls] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const debounceTimeout = useRef(null);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update filtered suggestions based on searchQuery with debounce
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (searchQuery.trim() === '') {
        setFilteredFood([]);
        setFilteredHalls([]);
        setShowDropdown(false);
        return;
      }

      const query = searchQuery.toLowerCase();

      // Filter food items
      const matchedFood = foodItems.filter((item) =>
        item.name.toLowerCase().includes(query)
      );

      // Filter dining halls
      const matchedHalls = diningHalls.filter((hall) =>
        hall.name.toLowerCase().includes(query)
      );

      setFilteredFood(matchedFood);
      setFilteredHalls(matchedHalls);

      if (matchedFood.length > 0 || matchedHalls.length > 0) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }

      setActiveIndex(-1); // Reset active index on new search
    }, 300); // Adjust debounce delay as needed

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery, foodItems, diningHalls]);

  // Combined suggestions
  const combinedSuggestions = [
    ...filteredFood.map((item) => ({ type: 'food', id: item.id, name: item.name })),
    ...filteredHalls.map((hall) => ({ type: 'hall', id: hall.id, name: hall.name })),
  ];

  // Handle input change
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle selection from dropdown
  const handleSelection = (type, id) => {
    setSearchQuery('');
    setShowDropdown(false);
    setActiveIndex(-1);

    if (type === 'food') {
      navigate(`/food-item-details/${id}`);
    } else if (type === 'hall') {
      navigate(`/dining-hall/${id}`);
    }
  };

  // Handle keydown events for navigation
  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < combinedSuggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < combinedSuggestions.length) {
        const selected = combinedSuggestions[activeIndex];
        handleSelection(selected.type, selected.id);
      }
    }
  };

  return (
    <div className="search-bar" ref={dropdownRef}>
      <div className="search-icon">
        <img src={magnifyingglass} alt="Search Icon" />
      </div>
      <input
        type="text"
        placeholder="Search for a specific dish or dining hall"
        value={searchQuery}
        onChange={handleChange}
        onFocus={() => {
          if (combinedSuggestions.length > 0) {
            setShowDropdown(true);
          }
        }}
        onKeyDown={handleKeyDown}
      />
      {showDropdown && combinedSuggestions.length > 0 && (
        <div className="dropdown">
          {filteredFood.length > 0 && (
            <div className="dropdown-section">
              <div className="dropdown-title">Food Items</div>
              {filteredFood.map((item, index) => (
                <div
                  key={item.id}
                  className={`dropdown-item ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => handleSelection('food', item.id)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
          {filteredHalls.length > 0 && (
            <div className="dropdown-section">
              <div className="dropdown-title">Dining Halls</div>
              {filteredHalls.map((hall, index) => (
                <div
                  key={hall.id}
                  className={`dropdown-item ${activeIndex === index + filteredFood.length ? 'active' : ''}`}
                  onClick={() => handleSelection('hall', hall.id)}
                >
                  {hall.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;