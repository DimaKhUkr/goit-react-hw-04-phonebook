import { AddContact } from './AddContact/AddContact';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
// import contacts from '../Data/contacts';
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filterData, setFilterData] = useState('');

  // const firstRender = useRef(true);

  // useEffect(() => {
  //   const contactsFromLS = localStorage.getItem('contacts');
  //   // console.log(`Данные в локал сторидже:${contactsFromLS}`);
  //   if (contactsFromLS) {
  //     setContacts(JSON.parse(contactsFromLS));
  //   }
  // }, []);

  useEffect(() => {
    // if (firstRender.current) {
    //   // console.log(`Реф первого рендера ${firstRender.current}`);
    //   firstRender.current = false;
    //   return;
    // }
    // console.log(`Реф первого рендера ${firstRender.current}`);
    // console.log(`Обновление номер:${(didupd.current += 1)}`);
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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
    const lowCaseFilter = filterData.toLowerCase();
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
      <Filter
        value={filterData}
        onFilter={e => setFilterData(e.currentTarget.value)}
      />
      <ContactsList
        onClickDelBtn={onClickDelBtn}
        contacts={visibleContacts()}
      />
    </div>
  );
}
