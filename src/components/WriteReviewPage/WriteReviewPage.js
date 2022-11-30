import './WriteReviewPage.css';
import storage from 'utility/storage';
import { useState } from 'react';
import { Rating } from 'primereact/rating';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import useStore from 'store/AuthState';

export const WriteReviewPage = () => {
  const [orderItemsForReview] = useState(
    storage.get('orderItemsForReview', []),
  );

  return (
    <div>
      {orderItemsForReview.map((orderItem, itemIndex) => {
        return <ReviewForm item={orderItem} index={itemIndex} />;
      })}
    </div>
  );
};

const ReviewForm = props => {
  const [rating, setRating] = useState(0);

  const [reviewText, setReviewText] = useState('Write your review here');
  const [disabled, setDisabled] = useState(false);

  const store = useStore();

  const handleReviewSubmitClicked = () => {
    const item = props.item;

    const addReviewObject = {
      itemId: item.itemId,
      itemType: item.item_type,
      userId: store?.userData?.user_id,
      rating: rating,
      review: reviewText,
      reviewDate: Date(),
    };

    store.addReview(addReviewObject, success => {
      if (success) {
        setDisabled(true);
      }
    });
  };

  return (
    <div className="review-container d-flex flex-column pt-2 pb-2 pl-4 pr-4 mt-2 mb-2">
      <h4 className="m-3">{props.item.item.title}</h4>
      <div
        className="d-flex align-items-center m-3"
        style={{ textAlign: 'center' }}
      >
        <h6>Give Your Rating: </h6>
        <Rating
          className="m-3"
          cancel={false}
          stars={5}
          value={rating}
          onChange={e => setRating(e.value)}
        />
      </div>
      <InputTextarea
        className="m-3"
        rows={5}
        cols={25}
        value={reviewText}
        onChange={e => setReviewText(e.target.value)}
      />
      <Button
        disabled={disabled}
        label="Submit"
        onClick={handleReviewSubmitClicked}
      />
    </div>
  );
};
