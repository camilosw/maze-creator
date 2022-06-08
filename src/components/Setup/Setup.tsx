import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import { configAtom } from 'services/config';

type FormData = {
  width: number;
  height: number;
  gridSpacing: number;
};

const Setup = () => {
  const [config, setConfig] = useRecoilState(configAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      width: config.width,
      height: config.height,
      gridSpacing: config.gridSpacing,
    },
  });

  const onHandleSubmit = (value: FormData) => {
    setConfig((currentConfig) => ({ ...currentConfig, ...value }));
  };

  return (
    <Form onSubmit={handleSubmit(onHandleSubmit)}>
      <Form.Group controlId="width">
        <Form.Label>Width</Form.Label>
        <Form.Control
          {...register('width', {
            required: 'Value is required.',
            min: {
              value: 2,
              message: 'Value must be greater than or equal to 2.',
            },
          })}
          type="number"
          min="2"
          isInvalid={!!errors.width}
        />
        {!!errors.width && (
          <Form.Control.Feedback type="invalid">
            {errors.width.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group controlId="width">
        <Form.Label>Height</Form.Label>
        <Form.Control
          {...register('height', {
            required: 'Value is required.',
            min: {
              value: 2,
              message: 'Value must be greater than or equal to 2.',
            },
          })}
          type="number"
          min="2"
          isInvalid={!!errors.height}
        />
        {!!errors.height && (
          <Form.Control.Feedback type="invalid">
            {errors.height.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group controlId="width">
        <Form.Label>Grid spacing</Form.Label>
        <Form.Control
          {...register('gridSpacing', {
            required: 'Value is required.',
            min: {
              value: 14,
              message: 'Value must be greater than or equal to 14.',
            },
          })}
          type="number"
          min="14"
          isInvalid={!!errors.gridSpacing}
        />
        {!!errors.gridSpacing && (
          <Form.Control.Feedback type="invalid">
            {errors.gridSpacing.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Setup;
