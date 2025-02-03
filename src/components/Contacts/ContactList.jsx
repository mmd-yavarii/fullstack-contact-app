import ContactCard from './ContactCard';

const ContactList = ({ contacts }) => {
    return (
        <div>
            {contacts.map((item) => (
                <ContactCard key={item.id} info={item} />
            ))}
        </div>
    );
};

export default ContactList;
