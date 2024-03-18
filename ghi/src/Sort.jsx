import 'bootstrap-icons/font/bootstrap-icons.css'

function Sort({ label, onClick, sortConfig, field }) {
    const isSorted = sortConfig && sortConfig.key === field
    const arrowIcon = isSorted ? (
        sortConfig.direction === 'asc' ? (
            <i className="bi bi-sort-up"></i>
        ) : (
            <i className="bi bi-sort-down-alt"></i>
        )
    ) : null
    const errorMessage =
        sortConfig.errorField === field ? 'Error sorting column' : ''

    return (
        <th>
            <span>
                {label} {arrowIcon}
            </span>
            <i
                className="bi bi-funnel"
                onClick={() => onClick(field)}
                style={{ marginLeft: '5px', cursor: 'pointer' }}
            ></i>
            {errorMessage && (
                <span style={{ color: 'red' }}> - {errorMessage}</span>
            )}
        </th>
    )
}

export default Sort
