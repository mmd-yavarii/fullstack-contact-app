import { useQuery } from '@tanstack/react-query';
import ContactCard from '../module/ContactCard';
import { useRouter } from 'next/router';
import LoadingPage from './LoadingPage';

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
            {/* search one contact */}

            {data.data.length ? (
                data.data.map((i, index) => <ContactCard key={index} name={i.name} phoneNumber={i.phoneNumber} />)
            ) : (
                <p style={{ textAlign: 'center', fontWeight: '900', opacity: '0.5', marginTop: '30px' }}>there's no contacts yet</p>
            )}
        </>
    );
}
