import s from "../Profile.module.css";

type Props = {
  name: string;
  contacts: { [key: string]: string };
};

export const Contact = ({ name, contacts }: Props) => {
  return (
    <div className={s.contact}>
      {name}: {contacts[name]}
    </div>
  );
};
