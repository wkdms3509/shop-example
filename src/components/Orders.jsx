import AppStateContext from '../contexts/AppStateContext';
import { useContext, useMemo } from 'react';
import './Orders.css';

const Orders = () => {
    // const orders = useOrders;
    const { orders, prototypes, remove, removeAll } = useContext(AppStateContext);

    const totalPrice = useMemo(() => {
        return orders.map(order => {
            const {id, quantity} = order;
            const prototype = prototypes.find(prototype => prototype.id === id);
            return prototype.price * quantity;
        })
        .reduce((l,r) => l + r, 0);
    }, [orders]);

    if(orders.length === 0) {
        return (
            <aside>
                <div className="empty">
                    <div className="title">You don't have any orders.</div>
                    <div className="subtitle">Click on a + add an order.</div>
                </div>
            </aside>
        );
    }

    return <aside >
        <div className="orders__body">
            {orders.map(order => {
                const {id} = order;
                const prototype = prototypes.find(prototype => prototype.id === id);
                const onClickRemove = () => {
                    remove(id);
                }
                // const onClickRemoveAll = () => {
                //     removeAll(id);
                // }

                return (
                    <div className="item" key={id}>
                        <div className="item__img">
                            <img src={prototype.thumnail} alt={prototype.title} />
                        </div>
                        <div className="content">
                            <p className="title">
                                {prototype.title} x {order.quantity}
                            </p>
                        </div>
                        <div className="action">
                            <p className="price">₩{prototype.price * order.quantity}</p>
                            <button className="btn__minus" onClick={onClickRemove}>x</button>
                        </div>
                    </div>
                );
                })
            }
        </div>
        <div className="total">
            <hr />
            <div className="item">
                <div className="content">
                    <p>총 결제금액: {totalPrice}</p>
                    <button onClick={removeAll} className="removeAllBtn" >전체삭제</button>
                </div>
            </div>
            <button className="btn__order">주문하기</button>
        </div>
    </aside>
}

export default Orders;