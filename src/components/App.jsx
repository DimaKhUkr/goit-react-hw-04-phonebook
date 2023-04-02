import { AddContact } from './AddContact/AddContact';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
// import contacts from '../Data/contacts';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    return contacts && this.setState({ contacts: JSON.parse(contacts) });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  DataHandleSubmit = data => this.AddContactMarckup(data);

  AddContactMarckup = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    console.log(this.state.contacts);
    console.log(newContact);
    this.state.contacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert('Этот чувак уже есть в книге бро')
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };

  onFilterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  visibleContacts = () => {
    const lowCaseFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowCaseFilter)
    );
  };

  onClickDelBtn = currentID => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== currentID),
    }));
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <AddContact onSubmit={this.DataHandleSubmit} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onFilter={this.onFilterChange} />
        <ContactsList
          onClickDelBtn={this.onClickDelBtn}
          contacts={this.visibleContacts()}
        />
      </div>
    );
  }
}
