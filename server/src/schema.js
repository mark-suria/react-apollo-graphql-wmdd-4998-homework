import { gql } from 'apollo-server'
import { find, remove } from 'lodash'

const contacts = [{
        id: '1',
        firstName: 'Paul',
        lastName: 'Lam'
    },
    {
        id: '2',
        firstName: 'John',
        lastName: 'Smith'
    },
    {
        id: '3',
        firstName: 'Jane',
        lastName: 'Doe'
    }
]

const typeDefs = gql `
  type Contact {
    id: String!
    firstName: String
    lastName: String
  }

  type Query {
    contacts: [Contact]
    contact(id: String!): Contact
  }
  
  type Mutation {
    addContact(id: String!, firstName: String!, lastName: String!): Contact
    updateContact(id: String!, firstName: String, lastName: String): Contact
    removeContact(id: String!): Contact
  }
`

const resolvers = {
    Query: {
        contacts: () => contacts,
        contact(parent, args, context, info) {
            return find(contacts, { id: args.id })
        }
    },
    Mutation: {
        addContact(parent, args, context, info) {
            const newContact = {
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName
            }
            contacts.push(newContact)

            return newContact
        },
        updateContact(root, args) {
            const contact = find(contacts, { id: args.id })

            if (!contact) {
                throw new Error(`Contact with id ${args.id} not found`)
            }

            contact.firstName = args.firstName
            contact.lastName = args.lastName

            return contact
        },
        removeContact(root, args) {
            const removedContact = find(contacts, { id: args.id })
            if (!removedContact) {
                throw new Error(`Contact with id ${args.id} not found`)
            }

            remove(contacts, c => {
                return c.id === removedContact.id
            })

            return removedContact
        }
    }
}

export { typeDefs, resolvers }