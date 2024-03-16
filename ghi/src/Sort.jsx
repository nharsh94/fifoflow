function Sort({ label, onClick, sortConfig, field }) {
    const isSorted = sortConfig && sortConfig.key === field
    const arrowIcon = isSorted
        ? sortConfig.direction === 'asc'
            ? '↑'
            : '↓'
        : ''
    const errorMessage =
        sortConfig.errorField === field ? 'Error sorting column' : ''

    return (
        <th>
            <span>
                {label} {arrowIcon}
            </span>
            <button
                onClick={onClick}
                className="btn btn-primary"
                style={{ marginLeft: '5px' }}
            >
                Sort{' '}
                {errorMessage && (
                    <span style={{ color: 'red' }}> - {errorMessage}</span>
                )}
            </button>
        </th>
    )
}

export default Sort
