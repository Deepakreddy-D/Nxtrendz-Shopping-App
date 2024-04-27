import {useState, useRef} from 'react'

import Popup from 'reactjs-popup'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => {
  const ref = useRef()
  const [paymentMethod, setPaymentMethod] = useState('')
  const openTooltip = () => ref.current.open()
  const closeTooltip = () => ref.current.close()
  // eslint-disable-next-line
  const [cash, setCash] = useState(true)
  // eslint-disable-next-line
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  const handlePaymentMethodChange = event => {
    setPaymentMethod(event.target.value)
    if (event.target.value === 'cashOnDelivery') {
      setCash(false)
    }
  }

  const confirmOrder = () => {
    if (paymentMethod === 'cashOnDelivery') {
      setOrderConfirmed(true)
      setTimeout(() => {
        closeTooltip()
      }, 5000)
    }
    setPaymentMethod('')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        return (
          <div>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}/-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>
            </div>
            <button
              type="button"
              className="checkout-button d-lg-none"
              onClick={openTooltip}
            >
              Checkout
            </button>
            <Popup
              ref={ref}
              trigger={
                <button
                  type="button"
                  className="checkout-button d-sm-none"
                  onClick={openTooltip}
                >
                  Checkout
                </button>
              }
              modal
              nested
            >
              {close => (
                <div className="modal">
                  <button className="close" onClick={close} type="button">
                    &times;
                  </button>

                  <div className="content">
                    <h1>Payment options</h1>
                    <p>Total Items: {cartList.length}</p>
                    <p>Total Price: {total} Rs</p>
                    <form>
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          disabled
                          onChange={handlePaymentMethodChange}
                        />{' '}
                        Card
                      </label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="netBanking"
                          disabled
                          onChange={handlePaymentMethodChange}
                        />{' '}
                        Net Banking
                      </label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          disabled
                          onChange={handlePaymentMethodChange}
                        />{' '}
                        UPI
                      </label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="wallet"
                          disabled
                          onChange={handlePaymentMethodChange}
                        />{' '}
                        Wallet
                      </label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cashOnDelivery"
                          onChange={handlePaymentMethodChange}
                        />{' '}
                        Cash on Delivery
                      </label>
                      <br />

                      <div id="summary">
                        <p>
                          Total Items: <span>{cartList.length}</span>
                        </p>
                        <p>
                          Total Price: <span>{total}</span>
                        </p>
                        <p>
                          Selected Payment Method: <span>{paymentMethod}</span>
                        </p>
                      </div>
                    </form>
                  </div>

                  <div className="actions">
                    <Popup
                      trigger={
                        <button
                          type="button"
                          className="button"
                          onClick={confirmOrder}
                        >
                          Confirm Order
                        </button>
                      }
                      position="top center"
                      nested
                    >
                      {closeSuccess => (
                        <div className="successMsg">
                          <button
                            className="close"
                            onClick={closeSuccess}
                            type="button"
                          >
                            &times;
                          </button>
                          <p className="success-order">
                            Your order has been placed successfully
                          </p>
                        </div>
                      )}
                    </Popup>
                    <button
                      className="button"
                      type="button"
                      onClick={() => {
                        console.log('modal closed ')
                        close()
                      }}
                    >
                      close modal
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
