import { useQuery } from '@tanstack/react-query';
import ContactCard from '../module/ContactCard';
import { useRouter } from 'next/router';
import LoadingPage from './LoadingPage';
import Link from 'next/link';

const headerStyle = {
    width: '100%',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ccc',
    position: 'sticky',
    top: '0',
    padding: '10px 20px',
    marginBottom: '15px',
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'space-between',
};

export default function HomePage({}) {
    const router = useRouter();

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['contacts'],
        queryFn: () => fetch('/api/contact').then((res) => res.json()),
        gcTime: 1000 * 60,
    });

    if (isError) {
        alert(`an error ocurred : ${error}`);
        router.reload();
        return;
    }

    if (isPending) return <LoadingPage />;

    return (
        <>
            <header style={headerStyle}>
                {data.userNumber ? (
                    <p style={{ fontSize: '1.2rem', fontWeight: '900' }}>{data.userNumber}</p>
                ) : (
                    <Link href="/auth/login" style={{ color: '#005eff' }}>
                        Login / Signup
                    </Link>
                )}

                <Link href="/add-new-contact" style={{ color: '#005eff' }}>
                    add new contact
                </Link>
            </header>

            {/* search one contact / inp + btn */}

            {data.data ? (
                data.data.map((i, index) => <ContactCard key={index} name={i.name} phoneNumber={i.phoneNumber} />)
            ) : (
                <p style={{ textAlign: 'center', fontWeight: '900', opacity: '0.5', marginTop: '30px' }}>there's no contacts yet</p>
            )}
        </>
    );
}
