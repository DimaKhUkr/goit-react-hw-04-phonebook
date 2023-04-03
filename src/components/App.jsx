import { AddContact } from './AddContact/AddContact';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
// import contacts from '../Data/contacts';
import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);
  const didupd = useRef(0);

  useEffect(() => {
    const contactsFromLS = localStorage.getItem('contacts');
    console.log(contactsFromLS);
    if (contactsFromLS) {
      return setContacts(JSON.parse(contactsFromLS));
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      console.log(firstRender.current);
      firstRender.current = false;
      return console.log('первый нах');
    }
    console.log(firstRender.current);

    console.log(didupd.current + 1);
    // localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [didupd]);

  // const DataHandleSubmit = data => AddContactMarckup(data);

  const AddContactMarckup = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert('Этот чувак уже есть в книге бро')
      : setContacts([newContact, ...contacts]);
  };

  const visibleContacts = () => {
    const lowCaseFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowCaseFilter)
    );
  };

  const onClickDelBtn = currentID => {
    setContacts(contacts.filter(contact => contact.id !== currentID));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <AddContact onSubmit={data => AddContactMarckup(data)} />
      <h2>Contacts</h2>
      <Filter value={filter} onFilter={e => setFilter(e.currentTarget.value)} />
      <ContactsList onClickDelBtn={onClickDelBtn} contacts={contacts} />
    </div>
  );
}