import LoadingPage from '@/components/template/LoadingPage';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { AiOutlineUser } from 'react-icons/ai';

import { FaPhoneAlt } from 'react-icons/fa';

export default function UserDetails() {
    const router = useRouter();
    const phoneNumber = router.query.phoneNumber;

    const { isPending, data, isError, error } = useQuery({
        queryKey: ['contacts', phoneNumber],
        queryFn: () => fetch(`/api/contact/${phoneNumber}`).then((res) => res.json()),
    });

    if (!router.isReady || isPending) return <LoadingPage />;

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', padding: '20px', borderBottom: '0.5px solid #ccc' }}>
                <div
                    style={{
                        width: '70px',
                        height: '70px',
                        backgroundColor: '#ccc',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <AiOutlineUser opacity="0.5" fontSize="2rem" />
                </div>

                <div>
                    <h1 style={{ padding: '0px 20px' }}>{data?.data?.name}</h1>
                    <p style={{ padding: '0px 20px' }}>{data?.data?.phoneNumber}</p>
                </div>
            </div>
            <a
                href={`tel:${data?.data?.phoneNumber}`}
                style={{
                    backgroundColor: '#005eff',
                    color: '#fff',
                    padding: '10px',
                    borderRadius: '7px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translate(-50%)',
                }}
            >
                <p>Make a phone call</p>
                <FaPhoneAlt />
            </a>
        </>
    );
}
