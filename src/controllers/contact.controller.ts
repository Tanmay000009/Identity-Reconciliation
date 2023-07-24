import { Request, Response } from "express";
import { Contact, ContactType } from "../entities/contact.model";
import {
  createContact,
  getContactByEmailAndPhone,
  getContactsByLinkedId,
  getPriamryContactByPhoneNumber,
  getPrimaryContactByEmail,
  updateContact,
  updateContacts,
} from "../repos/contact.repo";
import { removeDuplicates } from "../utils/helper";

export const handleContactIdentification = async (
  req: Request,
  res: Response,
) => {
  const { email, phoneNumber } = req.body;
  if (!email && !phoneNumber) {
    return res
      .status(400)
      .json({ message: "Email or Phone Number is required" });
  }
  if (email && phoneNumber) {
    return await handleEmailAndPhoneNumber(email, phoneNumber, res);
  }
  if (email) {
    return await handleEmail(email, res);
  }
  return await handlePhoneNumber(phoneNumber, res);
};

export const handleEmail = async (email: string, res: Response) => {
  try {
    const primaryContact = await getPrimaryContactByEmail(email);

    if (!primaryContact) {
      const data = {
        primaryContatctId: null,
        emails: [email],
        phoneNumbers: [],
        secondaryContactIds: [],
      };
      return res.status(200).json(data);
    }

    const secondaryContacts = await getContactsByLinkedId(primaryContact.id);

    const secondaryContactIds = secondaryContacts.map((contact) => contact.id);

    const data = {
      primaryContatctId: primaryContact.id,
      emails: removeDuplicates([
        primaryContact.email,
        ...secondaryContacts.map((contact) => contact.email),
      ]),
      phoneNumbers: removeDuplicates([
        primaryContact.phoneNumber,
        ...secondaryContacts.map((contact) => contact.phoneNumber),
      ]),
      secondaryContactIds,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handlePhoneNumber = async (phoneNumber: string, res: Response) => {
  try {
    const primaryContact = await getPriamryContactByPhoneNumber(phoneNumber);

    if (!primaryContact) {
      const noData = {
        primaryContatctId: null,
        emails: [],
        phoneNumbers: [phoneNumber],
        secondaryContactIds: [],
      };
      return res.status(200).json(noData);
    }

    const secondaryContacts = await getContactsByLinkedId(primaryContact.id);

    const secondaryContactIds = secondaryContacts.map((contact) => contact.id);

    const data = {
      primaryContatctId: primaryContact.id,
      emails: removeDuplicates([
        primaryContact.email,
        ...secondaryContacts.map((contact) => contact.email),
      ]),
      phoneNumbers: removeDuplicates([
        primaryContact.phoneNumber,
        ...secondaryContacts.map((contact) => contact.phoneNumber),
      ]),
      secondaryContactIds,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleEmailAndPhoneNumber = async (
  email: string,
  phoneNumber: string,
  res: Response,
) => {
  try {
    const primaryContactByEmail = await getPrimaryContactByEmail(email);
    const primaryContactByPhoneNumber = await getPriamryContactByPhoneNumber(
      phoneNumber,
    );

    if (!primaryContactByEmail && !primaryContactByPhoneNumber) {
      const newContact = await createContact({
        email,
        phoneNumber,
        type: ContactType.PRIMARY,
        linkedId: null,
      });
      return res.status(200).json({
        primaryContatctId: newContact.id,
        emails: [email],
        phoneNumbers: [phoneNumber],
        secondaryContactIds: [],
      });
    }

    if (primaryContactByEmail && !primaryContactByPhoneNumber) {
      return await hanlePrimaryContactByEmail(
        email,
        phoneNumber,
        primaryContactByEmail,
        res,
      );
    }

    if (!primaryContactByEmail && primaryContactByPhoneNumber) {
      return await handlePrimaryContactByPhoneNumber(
        email,
        phoneNumber,
        primaryContactByPhoneNumber,
        res,
      );
    }

    if (primaryContactByEmail && primaryContactByPhoneNumber) {
      if (primaryContactByEmail.id === primaryContactByPhoneNumber.id) {
        return await handlePcByBothSame(
          email,
          phoneNumber,
          primaryContactByEmail,
          res,
        );
      } else {
        return await handlePcByBothDiff(
          email,
          phoneNumber,
          primaryContactByEmail,
          primaryContactByPhoneNumber,
          res,
        );
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const hanlePrimaryContactByEmail = async (
  email: string,
  phoneNumber: string,
  primaryContactByEmail: Contact,
  res: Response,
) => {
  try {
    const contactExists = await getContactByEmailAndPhone(email, phoneNumber);
    if (!contactExists) {
      await createContact({
        email: email,
        phoneNumber: phoneNumber,
        type: ContactType.SECONDARY,
        linkedId: primaryContactByEmail.id,
      });
    }

    const secondaryContacts = await getContactsByLinkedId(
      primaryContactByEmail.id,
    );

    const secondaryContactIds = secondaryContacts.map((contact) => contact.id);

    const data = {
      primaryContatctId: primaryContactByEmail.id,
      emails: removeDuplicates([
        primaryContactByEmail.email,
        ...secondaryContacts.map((contact) => contact.email),
      ]),
      phoneNumbers: removeDuplicates([
        primaryContactByEmail.phoneNumber,
        ...secondaryContacts.map((contact) => contact.phoneNumber),
      ]),
      secondaryContactIds,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const handlePrimaryContactByPhoneNumber = async (
  email: string,
  phoneNumber: string,
  primaryContactByPhoneNumber: Contact,
  res: Response,
) => {
  try {
    const contactExists = await getContactByEmailAndPhone(email, phoneNumber);
    if (!contactExists) {
      await createContact({
        email: email,
        phoneNumber: phoneNumber,
        type: ContactType.SECONDARY,
        linkedId: primaryContactByPhoneNumber.id,
      });
    }

    const secondaryContacts = await getContactsByLinkedId(
      primaryContactByPhoneNumber.id,
    );

    const secondaryContactIds = secondaryContacts.map((contact) => contact.id);

    const data = {
      primaryContatctId: primaryContactByPhoneNumber.id,
      emails: removeDuplicates([
        primaryContactByPhoneNumber.email,
        ...secondaryContacts.map((contact) => contact.email),
      ]),
      phoneNumbers: removeDuplicates([
        primaryContactByPhoneNumber.phoneNumber,
        ...secondaryContacts.map((contact) => contact.phoneNumber),
      ]),
      secondaryContactIds,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const handlePcByBothSame = async (
  email: string,
  phoneNumber: string,
  primaryContactByEmail: Contact,
  res: Response,
) => {
  try {
    if (
      primaryContactByEmail.email !== email &&
      primaryContactByEmail.phoneNumber !== phoneNumber
    ) {
      const contactExists = await getContactByEmailAndPhone(email, phoneNumber);
      if (!contactExists) {
        await createContact({
          email: email,
          phoneNumber: phoneNumber,
          type: ContactType.SECONDARY,
          linkedId: primaryContactByEmail.id,
        });
      }
    }

    const secondaryContacts = await getContactsByLinkedId(
      primaryContactByEmail.id,
    );

    const secondaryContactIds = secondaryContacts.map((contact) => contact.id);

    const data = {
      primaryContatctId: primaryContactByEmail.id,
      emails: [
        primaryContactByEmail.email,
        ...secondaryContacts.map((contact) => contact.email),
      ],
      phoneNumbers: removeDuplicates([
        primaryContactByEmail.phoneNumber,
        ...secondaryContacts.map((contact) => contact.phoneNumber),
      ]),
      secondaryContactIds,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const handlePcByBothDiff = async (
  email: string,
  phoneNumber: string,
  primaryContactByEmail: Contact,
  primaryContactByPhoneNumber: Contact,
  res: Response,
) => {
  try {
    if (
      primaryContactByEmail.createdAt > primaryContactByPhoneNumber.createdAt
    ) {
      const secondaryPhoneContacts = await getContactsByLinkedId(
        primaryContactByPhoneNumber.id,
      );

      const updatedContacts = secondaryPhoneContacts.map((contact) => {
        contact.linkedId = primaryContactByEmail.id;
        return contact;
      });

      primaryContactByPhoneNumber.linkedId = primaryContactByEmail.id;
      primaryContactByPhoneNumber.type = ContactType.SECONDARY;

      updatedContacts.push(primaryContactByPhoneNumber);

      await updateContacts(updatedContacts);

      const contactExists = await getContactByEmailAndPhone(email, phoneNumber);
      if (!contactExists) {
        await createContact({
          email: email,
          phoneNumber: phoneNumber,
          type: ContactType.SECONDARY,
          linkedId: primaryContactByEmail.id,
        });
      }

      const secondaryEmailContacts = await getContactsByLinkedId(
        primaryContactByEmail.id,
      );

      const secondaryContactIds = secondaryEmailContacts.map(
        (contact) => contact.id,
      );

      const data = {
        primaryContatctId: primaryContactByEmail.id,
        emails: removeDuplicates([
          primaryContactByEmail.email,
          ...secondaryEmailContacts.map((contact) => contact.email),
        ]),
        phoneNumbers: removeDuplicates([
          primaryContactByEmail.phoneNumber,
          ...secondaryEmailContacts.map((contact) => contact.phoneNumber),
        ]),
        secondaryContactIds,
      };
      return res.status(200).json(data);
    } else {
      const secondaryEmailContacts = await getContactsByLinkedId(
        primaryContactByEmail.id,
      );

      const updatedContacts = secondaryEmailContacts.map((contact) => {
        contact.linkedId = primaryContactByPhoneNumber.id;
        return contact;
      });

      primaryContactByEmail.linkedId = primaryContactByPhoneNumber.id;
      primaryContactByEmail.type = ContactType.SECONDARY;

      updatedContacts.push(primaryContactByEmail);

      await updateContacts(updatedContacts);
      const contactExists = await getContactByEmailAndPhone(email, phoneNumber);
      if (!contactExists) {
        await createContact({
          email: email,
          phoneNumber: phoneNumber,
          type: ContactType.SECONDARY,
          linkedId: primaryContactByPhoneNumber.id,
        });
      }

      const secondaryPhoneContacts = await getContactsByLinkedId(
        primaryContactByPhoneNumber.id,
      );

      const secondaryContactIds = secondaryPhoneContacts.map(
        (contact) => contact.id,
      );

      const data = {
        primaryContatctId: primaryContactByPhoneNumber.id,
        emails: removeDuplicates([
          primaryContactByPhoneNumber.email,
          ...secondaryPhoneContacts.map((contact) => contact.email),
        ]),
        phoneNumbers: removeDuplicates([
          primaryContactByPhoneNumber.phoneNumber,
          ...secondaryPhoneContacts.map((contact) => contact.phoneNumber),
        ]),
        secondaryContactIds,
      };
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
