import { useState } from 'react';
import styles from './Form.module.css';
import Link from 'next/link';
import { PulseLoader } from 'react-spinners';
import Input from '../element/Input';

export default function Form({ formType, isLoading, handler }) {
    const [form, setForm] = useState(
        formType === 'signup'
            ? {
                  name: '',
                  phoneNumber: '',
                  password: '',
              }
            : {
                  phoneNumber: '',
                  password: '',
              }
    );

    return (
        <div className={styles.form}>
            <p>{formType === 'signup' ? 'Signup' : 'Login'}</p>

            {formType === 'signup' && (
                <Input type="text" label="name" state={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} />
            )}

            <Input
                type="text"
                label="phone number"
                state={form.phoneNumber}
                onChange={(e) => setForm((prev) => ({ ...prev, phoneNumber: e.target.value }))}
            />

            <Input type="text" label="password" state={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} />

            <button disabled={isLoading} onClick={() => handler(form)}>
                {isLoading ? <PulseLoader color="#fff" size="0.5rem" /> : formType === 'signup' ? 'Signup' : 'Login'}
            </button>

            <Link href={formType === 'signup' ? '/auth/login' : '/auth/signup'}>
                {formType === 'signup' ? "I've already have an account" : 'Create an account'}
            </Link>
        </div>
    );
}
