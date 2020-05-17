// @desc    Get contacts
// @route   GET /api/v1/contacts
// @access  Public
const getContacts = async (req: any) => {
  const contacts = [
    {
      firstName: 'tech',
      lastName: 'reagan',
      phoneNumber: 123456
    },
    {
      firstName: 'john',
      lastName: 'doe',
      phoneNumber: 123456
    }
  ]
  await req.respond({
    status: 200,
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify(contacts)
  })
}

export { getContacts }
