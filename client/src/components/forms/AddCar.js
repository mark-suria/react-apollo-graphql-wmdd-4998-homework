import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid'
import { ADD_CAR, GET_CARS } from '../../queries'

const AddCar = () => {
  const [id] = useState(uuidv4())
  const [addCar] = useMutation(ADD_CAR)
  const [form] = Form.useForm()
  const [, forcedUpdate] = useState()

  useEffect(() => {
    forcedUpdate({})
  }, [])

  const onFinish = values => {
    const { year, make, model, price, personId } = values

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addCar: {
          __type: 'Car',
          id,
          year,
          make,
          model,
          price,
          personId
        }
      },
      update: (proxy, { data: { addCar } }) => {
        const data = proxy.readQuery({ query: GET_CARS })
        proxy.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar]
          }
        })
      }
    })
  }

  return (
    <Form
      form={form}
      name='add-car-form'
      onFinish={onFinish}
      layout='inline'
      size='large'
      style={{ marginBottom: '40px' }}
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please input the year model!' }]}
      >
        <Input placeholder='i.e. 1994' type="number" step="any"/>
      </Form.Item>

      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input the name of the car maker!' }]}
      >
        <Input placeholder='i.e. Honda / Toyota' />
      </Form.Item>

      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please input the model of the car!' }]}
      >
        <Input placeholder='i.e. Civic or Accord' />
      </Form.Item>

      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input the price of the car!' }]}
      >
        <Input placeholder='i.e. the price in CAD' type="number" step="any" />
      </Form.Item>

      <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please input the owner!' }]}
      >
        <Input placeholder='i.e. John' />
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddCar
