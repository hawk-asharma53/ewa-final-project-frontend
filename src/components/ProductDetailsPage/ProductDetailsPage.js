import './ProductDetailsPage.css';
import storage from 'utility/storage';
import { useState } from 'react';
import { useCart } from 'react-use-cart';
import ListingComponent from '../ListingComponent/ListingComponent';
import { toastMsg } from 'utility/utility';
import { useEffect } from 'react';
import useStore from 'store/AuthState';
import { Rating } from 'primereact/rating';

export const ProductDetailsPage = () => {
  const { addItem } = useCart();
  const store = useStore();
  const [item] = useState(storage.get('productDetail', {}));
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const product = {
      itemType: item.itemType,
      itemId: item.itemDetail.id,
    };
    store.getProductReviewById(product);
  }, []);

  useEffect(() => {
    setReviews(store.productReviewsData);
  }, [store.productReviewsData]);

  const addToCart = val => {
    addItem(val);
    toastMsg('Added to Cart', false);
  };

  return (
    <div className="d-flex align-content-start">
      <div className="w-5">
        <ListingComponent
          listItem={item.itemDetail}
          addToCart={addToCart}
          type={item.itemType.toLowerCase()}
          handleClick={() => {}}
          hideDetailsButton={true}
        />
      </div>
      <div>
        <h4>Reviews</h4>
        {reviews.map(review => {
          return (
            <div className="d-flex align-items-center mb-4 mt-4">
              <Rating value={review.rating} cancel={false} disabled={true} />
              <div className="ml-6">"{review.review}"</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
