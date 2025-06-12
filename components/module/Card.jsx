import { useState } from 'react';

import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEyeSlash } from 'react-icons/fa6';

import styles from './Card.module.css';

function Card({ setContacts, name, phone, _id: id }) {
  const [nameInp, setNameInp] = useState(name);
  const [phoneInp, setPhoneInp] = useState(phone);
  const [isEditing, setIsEditiong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // edit handler
  async function saveCahnges() {
    if (nameInp && phoneInp) {
      try {
        setIsLoading(true);
        const resonse = await fetch(`/api/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ nameInp, phoneInp }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (resonse.status == 200) {
          setContacts((prev) =>
            prev.map((i) => {
              if (i._id == id) {
                i.name = nameInp;
                i.phone = phoneInp;
              }
              return i;
            })
          );
          setIsEditiong(false);
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('please fill in inputs correctly ');
    }
  }

  // delete handler
  async function deleteHandler() {
    const confirmtion = confirm('Are you sure ?');
    if (confirmtion) {
      try {
        setIsLoading(true);
        const resonse = await fetch(`/api/${id}`, {
          method: 'DELETE',
        });
        if (resonse.status == 200) {
          setContacts((prev) => prev.filter((i) => i._id != id));
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <h3>
          {name} {isLoading && ' - Loading ...'}
        </h3>
        <p>{phone}</p>

        {isEditing && (
          <div className={styles.edit}>
            <input type="text" value={nameInp} onChange={(e) => setNameInp(e.target.value)} />
            <input type="text" value={phoneInp} onChange={(e) => setPhoneInp(e.target.value)} />
            <button onClick={saveCahnges}>Save</button>
          </div>
        )}
      </div>

      <div className={styles.buttons}>
        <button onClick={() => setIsEditiong((prev) => !prev)}>{isEditing ? <FaRegEyeSlash /> : <FiEdit3 />}</button>

        <button onClick={deleteHandler}>
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
}

export default Card;
