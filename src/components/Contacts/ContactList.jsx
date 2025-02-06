import ContactCard from './ContactCard';

const ContactList = ({ displayContacts }) => {
    return (
        <div>
            {displayContacts.map((item) => (
                <ContactCard key={item.id} info={item} />
            ))}
        </div>
    );
};

export default ContactList;
