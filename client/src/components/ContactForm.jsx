import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  addContact,
  clearCurrent,
  useContacts
} from '../context/contact/ContactState';
const initialContact = {
  id: 0,
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  countryCode: ''
};
const ContactForm = () => {
  const [contactState, contactDispatch] = useContacts();
  const { current, contacts } = contactState;

  //* Set up hook initial values for component/local level form state
  const [contact, setContact] = useState(initialContact);
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(initialContact);
    }
  }, [current]);

  //* de-structure contact to use in the form below
  const { id, firstName, lastName, email, phoneNumber, countryCode } = contact;

  //*Locate max Id for correct id number to add to new contact
  //TODO CREATE A ID ITERATOR

  const onChange = (e) => {
    const idNum = contacts !== null && contacts.length - 1;
    setContact({ ...contact, [e.target.name]: e.target.value, id: idNum + 1 });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Adding one contact to state
    if (current === null) {
      addContact(contactDispatch, contact).then(() =>
        setContact(initialContact)
      );
    }
    // else update the edit contact
    console.log('contact add submnissiins', contact);
    // setData((prev) => [...prev, contact]);
    // setContact(initialContact);
    toast.success('Contact Added');
    // clearAll()
  };

  //   const clearAll=()=>{
  // clearCurrent(contactDispatch)
  //  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        //  className='block sm:flex sm:justify-between sm:items-center sm: w-full'
        className='flex flex-col items-center w-screen'>
        <h2 className='text-primary m-2'>
          {/* {current ? 'Edit Contact' : 'Add Contact'} */}
        </h2>
        <input
          className='p-2 m-2'
          type='text'
          placeholder='First Name'
          name='firstName'
          value={firstName}
          onChange={onChange}
        />
        <input
          className='p-2 m-2'
          type='text'
          placeholder='Last Name'
          name='lastName'
          value={lastName}
          onChange={onChange}
        />
        <input
          className='p-2 m-2'
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          onChange={onChange}
        />

        <input
          className='p-2 m-2'
          type='tel'
          placeholder='123-456-7890'
          name='phoneNumber'
          pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
          value={phoneNumber}
          onChange={onChange}
        />
        <input
          className='p-2 m-2'
          type='text'
          placeholder='Country Code'
          name='countryCode'
          value={countryCode}
          onChange={onChange}
        />
        <button className='btn btn-xs btn-accent m-2 sm:btn-md'>Submit</button>
      </form>
    </>
  );
};

export default ContactForm;
