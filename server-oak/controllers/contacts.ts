import Contact from '../models/Contact.ts'

// @desc    Get contacts
// @route   GET /api/v1/contacts
// @access  Public
const getContacts = async ({ response }: { response: any }) => {
  const contacts = await Contact.find()
  response.body = { success: true, data: contacts }
}

// @desc    Get contacts
// @route   GET /api/v1/contacts/:id
// @access  Public
const getContact = async ({
  params,
  response
}: {
  params: { id: string }
  response: any
}) => {
  const id = params.id
  if (!id) {
    response.status = 400
    response.body = { success: false, error: 'Id params is required' }
  }

  const contact = await Contact.findOne({ _id: { $oid: id } })

  if (!contact) {
    response.status = 404
    response.body = {
      success: false,
      error: `No contact with id of ${id}`
    }
    return
  }

  response.body = JSON.stringify({ success: true, data: contact })
}

// @desc    Update contacts
// @route   PUT /api/v1/contacts/:id
// @access  Public
const updateContact = async ({
  params,
  request,
  response
}: {
  params: { id: string }
  request: any
  response: any
}) => {
  const body = await request.body()
  const {
    firstName,
    lastName,
    phoneNumber
  }: { firstName: string; lastName: string; phoneNumber: number } = body.value

  const id = params.id

  const contact = await Contact.findOne({ _id: { $oid: id } })

  if (!contact) {
    response.status = 404
    response.body = {
      success: false,
      error: `No contact with id of ${id}`
    }
    return
  }

  await Contact.updateOne(
    { _id: { $oid: id } },
    {
      $set: { firstName, lastName, phoneNumber, updatedAt: new Date() }
    }
  )

  response.body = { success: true, data: contact }
}

// @desc    Create contacts
// @route   POST /api/v1/contacts
// @access  Public
const createContact = async ({
  request,
  response
}: {
  request: any
  response: any
}) => {
  const body = await request.body()
  const data = body.value

  let contact = await Contact.insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  contact = await Contact.findOne({ _id: contact })

  response.body = { success: true, data: contact }
}

// @desc    Delete contacts
// @route   DELETE /api/v1/contacts/:id
// @access  Public
const deleteContact = async ({
  params,
  response
}: {
  params: { id: string }
  response: any
}) => {
  const id = params.id

  let contact = await Contact.findOne({ _id: { $oid: id } })

  if (!contact) {
    response.status = 404
    response.body = {
      success: false,
      error: `No contact with id of ${id}`
    }
    return
  }

  await Contact.deleteOne({ _id: { $oid: id } })

  response.body = { success: true, data: contact }
}

export { getContacts, getContact, createContact, updateContact, deleteContact }
