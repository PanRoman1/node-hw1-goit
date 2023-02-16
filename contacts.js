const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

const writeDataInFile = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
};

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contactsList = contacts.map((contact) => contact.name);
    await writeDataInFile(contactsList);
    return contactsList;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const filteredContact = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    if (filteredContact) {
      await writeDataInFile(filteredContact);
      return filteredContact;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId.toString()
    );
    await writeDataInFile(filteredContacts);
    return filteredContacts;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await writeDataInFile(contacts);
    return contacts;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
