import { activeHeadings } from "../consts/activeHeadings";

const THeader = ({ onClick, sortRules }) => {
  const getSortLabel = ({ order }) => {
    if (order === 'asc') return '↑';
    if (order === 'desc') return '↓';
    return false;
  }

  const sortLabel = getSortLabel(sortRules);

  return (
    <thead>
      <tr>
        {activeHeadings.map(header => (
          <th key={header.key} onClick={() => onClick(header.key)}>
            {header.value}
            {header.key === sortRules.key && <span>{sortLabel}</span>}
          </th>
        ))}
        <th>Email</th>
        <th>Cтрана</th>
        <th>Город</th>
      </tr>
    </thead>
  )
}

export default THeader;