import { Contact, ContactType } from "src/entities/contact.model";
import { ds } from "src/utils/datasource";

export const getContactById = async (id: number) => {
  const contact = await ds.getRepository(Contact).findOne({
    where: { id },
  });
  return contact;
};

export const getPrimaryContactByEmail = async (email: string) => {
  const contact = await ds.getRepository(Contact).find({
    where: { email, type: ContactType.PRIMARY },
  });
  return contact;
};

export const getPriamryContactByPhoneNumber = async (phoneNumber: string) => {
  const contact = await ds.getRepository(Contact).find({
    where: { phoneNumber, type: ContactType.PRIMARY },
  });
  return contact;
};

export const getContactsByLinkedId = async (linkedId: number) => {
  const contacts = await ds.getRepository(Contact).find({
    where: { linkedId },
  });
  return contacts;
};

export const createContact = async (contact: Contact) => {
  const newContact = await ds.getRepository(Contact).save(contact);
  return newContact;
};

export const updateContact = async (contact: Contact) => {
  const updatedContact = await ds.getRepository(Contact).save(contact);
  return updatedContact;
};

export const deleteContact = async (id: number) => {
  const deletedContact = await ds.getRepository(Contact).delete(id);
  return deletedContact;
};
