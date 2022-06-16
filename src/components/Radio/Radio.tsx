import cns from 'classnames';

import cn from './Radio.module.css';

type Props = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'id' | 'type'
> & {
  name: string;
  label: React.ReactNode;
};

const Radio = ({ name, label, className, ...rest }: Props) => {
  return (
    <label htmlFor={name} className={cns(cn.label, className)}>
      <input {...rest} type="radio" name={name} id={name} />
      <span>{label}</span>
    </label>
  );
};

export default Radio;
