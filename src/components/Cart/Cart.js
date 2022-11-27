import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { routes } from 'utility/constants';
import serviceImage from 'assets/images/services-icon.png';

const Cart = () => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart,
    totalItems,
  } = useCart();

  let history = useHistory();

  if (isEmpty)
    return (
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100"></div>
          <h2 style={{ textAlign: 'center' }}>Your cart is empty</h2>
        </div>
      </section>
    );
  return (
    <>
      <section className="h-100 h-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: '15px' }}
              >
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0 text-black">
                            Shopping Cart
                          </h1>
                          <button
                            className="btn btn-link px-2"
                            onClick={() => emptyCart()}
                          >
                            Clear Cart
                          </button>
                          <h6 className="mb-0 text-muted">
                            {totalUniqueItems} items
                          </h6>
                        </div>
                        {items.map(item => (
                          <div className="row mb-4 d-flex justify-content-between align-items-center">
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src={item.image ? item.image : serviceImage}
                                className="img-fluid rounded-3"
                                alt="Cotton T-shirt"
                              />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <h6 className="text-muted">{item.subcategory}</h6>
                              <h6 className="text-black mb-0">{item.title}</h6>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button
                                className="btn btn-link px-2"
                                onClick={() =>
                                  updateItemQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <i className="fas fa-minus"></i>
                              </button>

                              <span className="btn btn-link px-2">
                                {item.quantity}
                              </span>

                              <button
                                className="btn btn-link px-2"
                                onClick={() =>
                                  updateItemQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 className="mb-0">
                                $ {item.price * item.quantity}
                              </h6>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button
                                className="btn btn-link px-2"
                                onClick={() => removeItem(item.id)}
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="pt-5">
                          <h6 className="mb-0">
                            <Link to={routes.PRODUCTS} className="text-body">
                              <i className="fas fa-long-arrow-alt-left me-2"></i>
                              Back to shop
                            </Link>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 bg-grey">
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <div className="d-flex justify-content-between mb-5">
                          <h5 className="text-uppercase">Total items</h5>
                          <h5>{totalItems}</h5>
                        </div>
                        <div className="d-flex justify-content-between mb-5">
                          <h5 className="text-uppercase">Total price</h5>
                          <h5>$ {cartTotal}</h5>
                        </div>

                        <button
                          onClick={() => history.push('/checkout')}
                          className="btn btn-dark btn-block btn-lg"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
