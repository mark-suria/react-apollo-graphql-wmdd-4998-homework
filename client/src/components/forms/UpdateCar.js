import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useMutation } from '@apollo/client'

import { UPDATE_CAR } from '../../queries'

const UpdateCar = props => {
    const [id] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [price, setPrice] = useState(props.price)
    const [personId, setPersonId] = useState(props.personId)
    const [updateCar] = useMutation(UPDATE_CAR)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {
        const { year, make, model, price, personId } = values

        updateCar({
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
                updateCar: {
                    __typename: 'Car',
                    id,
                    year,
                    make,
                    model,
                    price,
                    personId
                }
            }
        })
        props.onButtonClick()
    }

    const updateStateVariable = (variable, value) => {
        props.updateStateVariable(variable, value)
        switch (variable) {
            case 'year':
                setYear(value)
                break
              case 'make':
                setMake(value)
                break
             case 'model':
                setModel(value)
                break
            case 'price':
                setPrice(value)
                break
            case 'personId':
                setPersonId(value)
                break
              default:
                break
            }
    }

    return (
      <Form
        form={form}
        name='update-car-form'
        layout='inline'
        onFinish={onFinish}
        initialValues={{
          year: year,
          make: make,
          model: model,
          price: price,
          personId: personId
        }}
        size='large'
      >
      
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please input the year model!' }]}
      >
        <Input placeholder='i.e. 1994' />
        onChange={e => updateStateVariable('year', e.target.value)}
      </Form.Item>

      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input the name of the car maker!' }]}
      >
        <Input placeholder='i.e. Honda / Toyota' />
        onChange={e => updateStateVariable('make', e.target.value)}
      </Form.Item>

      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please input the model of the car!' }]}
      >
        <Input placeholder='i.e. Civic or Accord' />
        onChange={e => updateStateVariable('model', e.target.value)}
      </Form.Item>

      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input the price of the car!' }]}
      >
        <Input placeholder='i.e. the price in CAD' />
        onChange={e => updateStateVariable('price', e.target.value)}
      </Form.Item>

      <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please input the owner!' }]}
      >
        <Input placeholder='i.e. John' />
        onChange={e => updateStateVariable('personId', e.target.value)}
      </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Update Car
            </Button>
          )}
        </Form.Item>
        <Button onClick={props.onButtonClick}>Cancel</Button>
      </Form>
    )
  }

export default UpdateCar