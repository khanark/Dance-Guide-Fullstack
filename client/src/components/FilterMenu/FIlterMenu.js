import "./FIlterMenu.css";

const FilterMenu = ({ filters, setFilters }) => {
  const onChangeHandler = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const debounce = (cb, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => cb(...args), delay);
    };
  };

  const setDebouncedLocation = debounce(onChangeHandler, 500);

  return (
    <div className="filter-menu">
      <h3 className="menu-title">Filter by</h3>
      <form>
        <label htmlFor="location" className="filter-menu--label ">
          <p className="input-title">Location</p>
          <div className="input-location-wrapper">
            <input
              type="text"
              name="location"
              placeholder="Sofia..."
              className="input-field"
              value={filters.location}
              onChange={setDebouncedLocation}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="location-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
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
            <option value="">All Styles</option>
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
            <option value="">Default</option>
            <option value="likes">Most popular</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
      </form>
    </div>
  );
};

export default FilterMenu;
