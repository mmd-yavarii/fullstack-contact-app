import Input from '@/components/element/Input';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { PulseLoader } from 'react-spinners';

export default function AddNewContact() {
    const [contact, setContact] = useState({
        name: '',
        phoneNumber: '',
    });

    async function fetchContactHandler(data) {
        const res = await fetch('/api/contact/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res.json();
    }

    const { isPending, mutate } = useMutation({
        mutationFn: fetchContactHandler,
        onError: (error) => alert(`an error ocurred : ${error.message}`),
        onSuccess: (data) => {
            if (data.status === 'success') {
                alert('Contact created successfully');
                setContact({
                    name: '',
                    phoneNumber: '',
                });
            } else {
                alert(data.message || 'Something went wrong');
            }
        },
    });

    return (
        <div className="addContactForm">
            <Input type="text" label="name" state={contact.name} onChange={(e) => setContact((prev) => ({ ...prev, name: e.target.value }))} />

            <Input
                type="text"
                label="phone number"
                state={contact.phoneNumber}
                onChange={(e) => setContact((prev) => ({ ...prev, phoneNumber: e.target.value }))}
            />

            <button className="addContactBtn" disabled={!(contact.phoneNumber && contact.name) || isPending} onClick={() => mutate(contact)}>
                {isPending ? <PulseLoader color="#fff" size="0.5rem" /> : 'Add Contact'}
            </button>
        </div>
    );
}
