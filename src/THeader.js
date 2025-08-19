const THeader = ({ onClick, sortRules}) => {
  const sortHeadings = [
    { key: 'lastName', value: 'Фамилия' },
    { key: 'firstName', value: 'Имя' },
    { key: 'maidenName', value: 'Отчество' },
    { key: 'age', value: 'Возраст' },
    { key: 'gender', value: 'Пол' },
    { key: 'phone', value: 'Телефон' },
  ];

  const getSortLabel = ({ order }) => {
    if (order === 'asc') return '↑';
    if (order === 'desc') return '↓';
    return false;
  }

  const sortLabel = getSortLabel(sortRules);

  return (
    <thead>
      <tr>
        {sortHeadings.map(header => (
          <th key={header.key} onClick={() => onClick(header.key)}>
            {header.value}
            {header.key === sortRules.key&&<span>{sortLabel}</span>}
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