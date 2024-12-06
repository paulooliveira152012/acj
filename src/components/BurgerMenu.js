import '../styles/style.css'

const BurgerMenu = ({ toggle }) => {
  return (
    <div className={`burgerMenuContainer ${toggle ? 'open' : ''}`}>
      <div className="bar bar1"></div>
      <div className="bar bar2"></div>
      <div className="bar bar3"></div>
    </div>
  );
};

export default BurgerMenu;

