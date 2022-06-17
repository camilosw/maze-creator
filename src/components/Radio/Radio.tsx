import cns from 'classnames';

import cn from './Radio.module.css';

type Props = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'type'
> & {
  name: string;
  label: React.ReactNode;
};

const Radio = ({ id, name, label, className, ...rest }: Props) => {
  return (
    <label htmlFor={id} className={cns(cn.label, className)}>
      <input {...rest} type="radio" name={name} id={id} />
      <span>{label}</span>
    </label>
  );
};

export default Radio;
