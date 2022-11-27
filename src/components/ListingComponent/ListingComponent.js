import React, { Component } from 'react';
import './ListingComponent.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ListItemTypes } from '../../utility/constants';

class ListingComponent extends Component {
  constructor(props) {
    super(props);
  }

  state = {};

  componentDidMount() {}

  render() {
    const { listItem, type } = this.props;
    if (type === ListItemTypes.Service) {
      return (
        <span className="listCard">
          <Card
            title={listItem.title}
            subTitle={listItem.subcategory}
            footer={<Button label="View Details" />}
            header={
              listItem.image !== '' && (
                <img
                  alt="service"
                  className="item-image"
                  src={listItem.image}
                />
              )
            }
          >
            {'Charged at $' + listItem.price + '/hour'}
          </Card>
        </span>
      );
    } else if (type === ListItemTypes.Product) {
      return (
        <span className="listCard">
          <Card
            title={listItem.title}
            subTitle={listItem.subcategory}
            footer={<Button label="View Details" />}
            header={
              <img
                alt="productImage"
                className="item-image"
                src={listItem.image}
              />
            }
          >
            {'Available for $' + listItem.price}
          </Card>
        </span>
      );
    }
  }
}

export default ListingComponent;
