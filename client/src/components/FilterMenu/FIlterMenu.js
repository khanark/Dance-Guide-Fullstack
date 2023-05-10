import "./FIlterMenu.css";

import { useState } from "react";

const FilterMenu = () => {
  const [filters, setFilters] = useState({
    location: "",
    style: "1",
    order: "1",
  });

  const onChangeHandler = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(filters);
  };

  return (
    <div className="filter-menu">
      <h3 className="menu-title">Filter by</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="location" className="filter-menu--label">
          <p className="input-title">Location</p>
          <input
            type="text"
            name="location"
            className="input-field"
            onChange={onChangeHandler}
            value={filters.location}
          />
        </label>
        <label htmlFor="style" className="filter-menu--label">
          <p className="input-title">Style</p>
          <select
            name="style"
            id="style"
            className="input-field"
            onChange={onChangeHandler}
            value={filters.style}
          >
            <option value="1">Classical Ballet</option>
            <option value="2">Modern Dances</option>
            <option value="3">Oriental Dances</option>
            <option value="4">Folklore Dances</option>
            <option value="5">Hip - Hop Dances</option>
            <option value="6">Sport Dances</option>
          </select>
        </label>
        <label htmlFor="order" className="filter-menu--label">
          <p className="input-title">Order by</p>
          <select
            name="order"
            id="order"
            className="input-field"
            value={filters.order}
            onChange={onChangeHandler}
          >
            <option value="likes">Most popular</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
        <button className="btn-filter">Search</button>
      </form>
    </div>
  );
};

export default FilterMenu;
