import { ClockLoader } from 'react-spinners';

function LoadingPage() {
    const style = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        flexDirection: 'column',
        height: '100vh',
        background: '#fff',
        zIndex: '20',
    };

    return (
        <div style={style}>
            <ClockLoader />

            <div>
                <p style={{ fontWeight: '900', textAlign: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>Loading ...</p>
                <p style={{ opacity: '0.7', textAlign: 'center' }}>Just a moment, everything is getting ready.</p>
            </div>
        </div>
    );
}

export default LoadingPage;
