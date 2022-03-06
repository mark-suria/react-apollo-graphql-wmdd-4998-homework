import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'

import { filter } from 'lodash'
import { GET_PEOPLE, REMOVE_PERSON } from '../../queries'

const RemoveContact = ({ id, firstName, lastName }) => {
    const [removeContact] = useMutation(REMOVE_PERSON, {
        update(proxy, { data: { removeContact } }) {
            const { people } = proxy.readQuery({ query: GET_PEOPLE })
            proxy.writeQuery({
                query: GET_PEOPLE,
                data: {
                    people: filter(people, o => {
                        return o.id !== removeContact.id
                    })
                }
            })
        }
    })

    const handleButtonClick = () => {
        let result = window.confirm('Are you sure you want to delete this contact?')
        if (result) {
            removeContact({
                variables: {
                    id
                },
                optimisticResponse: {
                    __typename: 'Mutation',
                    removeContact: {
                        __typename: 'Contact',
                        id,
                        firstName,
                        lastName
                    }
                }
            })
        }
    }
    return <DeleteOutlined key = 'delete'
    onClick = { handleButtonClick }
    style = {
        { color: 'red' } }
    />
}

export default RemoveContact