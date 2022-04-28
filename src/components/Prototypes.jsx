import './Prototypes.css';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { useContext } from 'react';
import AppStateContext from '../contexts/AppStateContext';
// import useActions from '../hooks/useActions';
// import usePrototypes from '../hooks/UsePrototypes';

const Prototypes = () => {
    const { prototypes, addToOrder } = useContext(AppStateContext);
    // const prototypes = usePrototypes;
    // const { addToOrder } = useActions;

    const itemList = prototypes.map(prototype => {
        const {id, title, thumnail, url, price, desc} = prototype;
        const click = () => {
            addToOrder(id);
        }
        return (
            <div key={id} className="item">
                <a href={url} target="_blank" rel="noreferrer">
                    <div>
                        <img className="item__img" src={thumnail} alt={title} />
                    </div>
                </a>
                <div className="item__info">
                    <div className="main__info">
                        <div className="item__title">
                            {title}
                            <p className="item__price">₩ {price}</p>
                        </div>
                        <div className="btn">
                            <BsFillCartPlusFill onClick={click} className="icon icon--plus" size="32" />
                        </div>
                    </div>
                    <p className="item__desc">{desc}</p>
                </div>
            </div>
        );
    })

    return (
        <div className="itemList">
            {itemList}
        </div>
    );
}

export default Prototypes;