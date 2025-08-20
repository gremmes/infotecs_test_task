import classNames from '../utils/classNames';

const Header = ({ children }) => {
  return (
    <header className="modal-header">
      <h1 className="modal-title">{children}</h1>
    </header>
  );
};

const Body = ({ user }) => {
  if (!user) return null;
  
  return (
    <div className="modal-body">
      <h2>{user.firstName} {user.lastName} {user.maidenName}</h2>
      <img src={user.image} alt={`${user.firstName} ${user.lastName}`} style={{ width: '100px', borderRadius: '50%' }} />
      <p><strong>Возраст:</strong> {user.age}</p>
      <p><strong>Рост:</strong> {user.height} см</p>
      <p><strong>Вес:</strong> {user.weight} кг</p>
      <p><strong>Телефон:</strong> {user.phone}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Адрес:</strong> {user.address.address}, {user.address.city}, {user.address.state}, {user.address.country}</p>
    </div>
  )
}

const Footer = ({ children }) => <div className="modal-footer">{children}</div>;

const Modal = ({ isOpen, children }) => {
  const cn = classNames(
    {
      modal: true,
      fade: true,
      show: isOpen,
    },
  );

  return (
    <div className={cn} role="dialog" tabIndex="-1" aria-modal="true">
      <div className="modal-dialog">
        <div className="modal-content">{children}</div>
      </div>
    </div>
  )
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;