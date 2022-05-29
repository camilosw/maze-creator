import cns from 'classnames';

import cn from './Checkbox.module.css';

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

const Checkbox = ({ name, label, className, ...rest }: Props) => {
  return (
    <label htmlFor={name} className={cns(cn.label, className)}>
      <input {...rest} type="checkbox" name={name} id={name} />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
