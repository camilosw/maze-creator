import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import { configAtom } from 'services/config';
import cn from './Setup.module.scss';

type FormData = {
  width: number;
  height: number;
  gridSpacing: number;
};

type Props = {
  onSetup(): void;
};

const Setup = ({ onSetup }: Props) => {
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
    onSetup();
  };

  return (
    <Form onSubmit={handleSubmit(onHandleSubmit)} className={cn.setup}>
      <div className="title">Create new maze</div>
      <Form.Group controlId="width" className={cn.formGroup}>
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
      <Form.Group controlId="width" className={cn.formGroup}>
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
      <Form.Group controlId="width" className={cn.formGroup}>
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
      <div className={cn.actions}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default Setup;
