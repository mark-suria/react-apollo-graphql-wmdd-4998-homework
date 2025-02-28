import { useQuery } from '@apollo/client'
import { List } from 'antd'
import { GET_PEOPLE } from '../../queries'
import Contact from '../listItems/Contact'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const Contacts = () => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_PEOPLE)
  if (loading) return 'Loading...'
  if (error) return `Error1 ${error.message}`

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.people.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <Contact key={id} id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
  )
}

export default Contacts
