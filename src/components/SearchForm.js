import { activeHeadings } from "../consts/activeHeadings";
import { useState } from "react";

const SearchForm = ({ onFilterChange }) => {
  const [category, setCategory] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onFilterChange({ category, searchText });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Фильтр поиска:</h3>
      <select
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">-выберите параметр поиска-</option>
        {activeHeadings.map(heading => (
          <option value={heading.key} key={heading.key}>{heading.value}</option>
        ))}
      </select>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button type="submit">Поиск</button>
    </form>
  )
}

export default SearchForm;