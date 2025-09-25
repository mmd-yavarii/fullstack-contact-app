const inputStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        width: '100%',
        border: '1px solid var(--border)',
        outline: 'none',
        padding: '10px',
        borderRadius: '7px',
        backgroundColor: 'transparent',
    },
    label: {
        marginBottom: '5px',
    },
};

export default function Input({ type, state, onChange, label }) {
    return (
        <div style={inputStyles.container}>
            <label htmlFor={label} style={inputStyles.label}>
                {label}
            </label>
            <input type={type} value={state} onChange={onChange} id={label} style={inputStyles.input} />
        </div>
    );
}
