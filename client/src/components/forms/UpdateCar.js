import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { GET_PEOPLE, UPDATE_CAR } from "../../queries";

const UpdateCar = (props) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setMake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);

  const [updateCar] = useMutation(UPDATE_CAR);
  const { data } = useQuery(GET_PEOPLE);

  useEffect(() => {
    forceUpdate();
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
    });
    props.onButtonClick();
  };

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value);
    switch (variable) {
      case "year":
        setYear(value);
        break;
      case "make":
        setMake(value);
        break;
      case "model":
        setModel(value);
        break;
      case "price":
        setPrice(value);
        break;
      default:
        break;
    }
  };

  return (
    <Form
      form={form}
      name="update-car-form"
      layout="inline"
      onFinish={onFinish}
      size="large"
      initialValues={{
        id: id,
        year: year,
        make: make,
        model: model,
        price: price,
      }}
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
        <Input
          placeholder="Year"
          onChange={(e) => updateStateVariable("year", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="make"
        label="Make"
        rules={[{ required: true, message: "Please input make!" }]}
      >
        <Input
          placeholder="Make"
          onChange={(e) => updateStateVariable("make", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="model"
        label="Model"
        rules={[{ required: true, message: "Please input model!" }]}
      >
        <Input
          placeholder="Model"
          onChange={(e) => updateStateVariable("model", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please input price!" }]}
      >
        <Input
          placeholder="Price"
          onChange={(e) => updateStateVariable("price", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="personId"
        label="Person"
        rules={[{ required: true, message: "Please select a person!" }]}
      >
        <Select placeholder="Select a person">
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
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("person")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
