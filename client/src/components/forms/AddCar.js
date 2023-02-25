import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Divider, Form, Input, Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries";

const AddPerson = () => {
  const [id] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);

  const { loading, error, data } = useQuery(GET_PEOPLE);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate([]);
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {data && data.people.length > 0 && (
        <>
          <Divider>Add Car</Divider>
          <Form
            name="add-car-form"
            form={form}
            layout="inline"
            onFinish={onFinish}
            size="large"
            style={{
              marginBottom: "40px",
              display: "flex",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            <Form.Item
              name="year"
              label="Year"
              rules={[{ required: true, message: "Please input year!" }]}
            >
              <Input placeholder="Year" />
            </Form.Item>

            <Form.Item
              name="make"
              label="Make"
              rules={[{ required: true, message: "Please input make!" }]}
            >
              <Input placeholder="Make" />
            </Form.Item>

            <Form.Item
              name="model"
              label="Model"
              rules={[{ required: true, message: "Please input model!" }]}
            >
              <Input placeholder="Model" />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please input price!" }]}
            >
              <Input placeholder="Price" />
            </Form.Item>

            <Form.Item
              name="personId"
              label="Person"
              rules={[{ required: true, message: "Please select a person!" }]}
            >
              <Select placeholder="Select a person" loading={loading}>
                {data &&
                  data.people.map((person) => (
                    <Select.Option key={person.id} value={person.id}>
                      {person.firstName} {person.lastName}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item shouldUpdate={true}>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    form.getFieldsError().filter(({ errors }) => errors.length)
                      .length
                  }
                >
                  Add Car
                </Button>
              )}
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};

export default AddPerson;
