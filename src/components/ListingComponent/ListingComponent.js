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
            title={listItem.provider}
            subTitle={listItem.serviceType}
            footer={<Button label="View Details" />}
            header={<img alt="provider image item-image" src="plumber.png" />}
          >
            {'Charged at $' + listItem.price + '/hour'}
          </Card>
        </span>
      );
    } else if (type === ListItemTypes.Product) {
      return (
        <span className="listCard">
          <Card
            title={listItem.productName}
            subTitle={listItem.provider}
            footer={<Button label="View Details" />}
            header={
              <img alt="provider image item-image" src="woodworking.jpeg" />
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
