import { Contact, ContactType, CreateContact } from "../entities/contact.model";
import { ds } from "../utils/datasource";

export const getContactById = async (id: number) => {
  const contact = await ds.getRepository(Contact).findOne({
    where: { id },
  });
  return contact;
};

export const getPrimaryContactByEmail = async (email: string) => {
  const contact = await ds.getRepository(Contact).findOne({
    where: { email, type: ContactType.PRIMARY },
  });
  return contact;
};

export const getPriamryContactByPhoneNumber = async (phoneNumber: string) => {
  const contact = await ds.getRepository(Contact).findOne({
    where: { phoneNumber, type: ContactType.PRIMARY },
  });
  return contact;
};

export const getContactByEmailAndPhone = async (
  email: string,
  phoneNumber: string,
) => {
  const contact = await ds.getRepository(Contact).findOne({
    where: { email, phoneNumber },
  });
  return contact;
};

export const getContactsByLinkedId = async (linkedId: number) => {
  const contacts = await ds.getRepository(Contact).find({
    where: { linkedId, type: ContactType.SECONDARY },
  });
  return contacts;
};

export const createContact = async (contact: CreateContact) => {
  const newContact = await ds.getRepository(Contact).save(contact);
  return newContact;
};

export const updateContact = async (contact: Contact) => {
  const updatedContact = await ds.getRepository(Contact).save(contact);
  return updatedContact;
};

export const updateContacts = async (contacts: Contact[]) => {
  const updatedContacts = await ds.getRepository(Contact).save(contacts);
  return updatedContacts;
};

export const deleteContact = async (id: number) => {
  const deletedContact = await ds.getRepository(Contact).delete(id);
  return deletedContact;
};
