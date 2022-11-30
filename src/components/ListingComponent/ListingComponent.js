import React, { Component } from 'react';
import './ListingComponent.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ListItemTypes } from '../../utility/constants';
import { Rating } from 'primereact/rating';

class ListingComponent extends Component {
  constructor(props) {
    super(props);
  }

  state = {};

  componentDidMount() {}

  render() {
    const { listItem, type, addToCart } = this.props;
    if (type === ListItemTypes.Service) {
      return (
        <Card
          className="listCard d-flex flex-column justify-content-center"
          title={listItem.title}
          subTitle={listItem.subcategory}
          footer={
            <Button onClick={() => addToCart(listItem)} label="Add to Cart" />
          }
          header={
            listItem.image !== '' && (
              <img alt="service" className="item-image" src={listItem.image} />
            )
          }
        >
          <div className="d-flex flex-column">
            <Rating value={listItem.rating} cancel={false} disabled={true} />
            <h6 style={{ 'margin-top': '10px' }}>
              {'Charged at $' + listItem.price + ' per hour'}
            </h6>
          </div>
        </Card>
      );
    } else if (type === ListItemTypes.Product) {
      return (
        <Card
          className="listCard d-flex flex-column justify-content-between"
          title={listItem.subcategory}
          subTitle={listItem.title}
          footer={
            <Button onClick={() => addToCart(listItem)} label="Add to Cart" />
          }
          header={
            <img
              alt="productImage"
              className="item-image"
              src={listItem.image}
            />
          }
        >
          <div className="d-flex flex-column">
            <Rating value={listItem.rating} cancel={false} disabled={true} />
            <h6 style={{ 'margin-top': '10px' }}>
              {'Available for $' + listItem.price}
            </h6>
          </div>
        </Card>
      );
    }
  }
}

export default ListingComponent;
