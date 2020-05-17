import Contact from '../models/Contact.ts'

// @desc    Get contacts
// @route   GET /api/v1/contacts
// @access  Public
const getContacts = async (req: any) => {
  // const contacts = [
  //   {
  //     firstName: 'tech',
  //     lastName: 'reagan',
  //     phoneNumber: 123456
  //   },
  //   {
  //     firstName: 'john',
  //     lastName: 'doe',
  //     phoneNumber: 123456
  //   }
  // ]
  const contacts = await Contact.find()
  await req.respond({
    status: 200,
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ success: true, data: contacts })
  })
}

// @desc    Get contacts
// @route   GET /api/v1/contacts
// @access  Public
const getContact = async (req: any) => {
  // const contacts = [
  //   {
  //     firstName: 'tech',
  //     lastName: 'reagan',
  //     phoneNumber: 123456
  //   },
  //   {
  //     firstName: 'john',
  //     lastName: 'doe',
  //     phoneNumber: 123456
  //   }
  // ]
  const contacts = await Contact.find()
  await req.respond({
    status: 200,
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ success: true, data: contacts })
  })
}

// @desc    Create contacts
// @route   POST /api/v1/contacts
// @access  Public
const createContact = async (req: any) => {
  const data = (await req.json()) as {
    firstName: string
    lastName: string
    phoneNumber: number
  }

  let contact = await Contact.insertOne(data)
  console.log(contact.$oid)
  contact = await Contact.findOne({ _id: contact })

  await req.respond({
    status: 200,
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ success: true, data: contact })
  })
}

export { getContacts, getContact, createContact }
