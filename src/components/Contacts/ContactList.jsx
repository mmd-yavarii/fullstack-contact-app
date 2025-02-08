import ContactCard from './ContactCard';

const ContactList = ({ displayContacts, openContactsInfoPage }) => {
    return (
        <div>
            {displayContacts.map((item) => (
                <ContactCard
                    key={item.id}
                    info={item}
                    openContactsInfoPage={openContactsInfoPage}
                />
            ))}
        </div>
    );
};

export default ContactList;
