import Form from '@/components/template/Form';
import { verifyToken } from '@/utils/Auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter();

    // request
    async function requestHandler(data) {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.json();
    }

    const { isPending, mutate } = useMutation({
        mutationFn: requestHandler,
        onError: (error) => alert(`an error ocurred : ${error.message}`),
        onSuccess: (data) => (data.status == 'success' ? router.replace('/') : alert(data.message)),
    });

    return <Form formType="login" isLoading={isPending} handler={(form) => mutate(form)} />;
}

// redirect user if already logged in
export async function getServerSideProps(context) {
    const token = context.req.cookies?.token || '';

    if (token && verifyToken(token)) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}
