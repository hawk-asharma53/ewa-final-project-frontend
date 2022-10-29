import React, { Component } from 'react';
import './ProductsPage.css';
import ListingComponent from '../ListingComponent/ListingComponent';
import { SelectButton } from 'primereact/selectbutton';
import { ProductFilters, ListItemTypes } from '../../utility/constants';

class ProductsPage extends Component {
  constructor(props) {
    super(props);
    let plumbing = {
      productName: 'Plumbing Kit',
      provider: 'The PlumbShop',
      productType: 'plumbing',
      price: 199.49,
    };
    let woodworking = {
      productName: 'Woodworking Kit',
      provider: 'Carpentry Store',
      productType: 'woodworking',
      price: 199.49,
    };
    let painting = {
      productName: 'Home Painting Kit',
      provider: 'Elephant Company',
      productType: 'painting',
      price: 199.49,
    };
    let gardening = {
      productName: 'Gardening Kit',
      provider: 'Green Thumb Groups',
      productType: 'gardening',
      price: 199.49,
    };
    let automobile = {
      productName: 'Automobile Maintainence Kit',
      provider: 'General Motors',
      productType: 'automobile',
      price: 199.49,
    };
    let productsOffered = [
      plumbing,
      woodworking,
      painting,
      automobile,
      gardening,
      plumbing,
      woodworking,
      painting,
      automobile,
      gardening,
    ];
    this.state = {
      productsOffered: productsOffered,
      primaryProductFilterValue: ProductFilters[0].value,
    };
  }

  state = {};

  componentDidMount() {}

  render() {
    const { productsOffered, primaryProductFilterValue } = this.state;
    return (
      <div className="productsPage">
        <span className="filtersRow">
          <SelectButton
            value={primaryProductFilterValue}
            options={ProductFilters}
            onChange={e => this.handlePrimaryFilterChange(e)}
          ></SelectButton>
        </span>
        <span className="itemCarousel">
          <div className="grid">
            {productsOffered
              .filter(
                listItem => listItem.productType === primaryProductFilterValue,
              )
              .map(listItem => (
                <div className="col-3">
                  <ListingComponent
                    listItem={listItem}
                    type={ListItemTypes.Product}
                  />
                </div>
              ))}
          </div>
        </span>
      </div>
    );
  }

  itemTemplate = listItem => {
    return (
      <ListingComponent listItem={listItem} type={ListItemTypes.Product} />
    );
  };

  handlePrimaryFilterChange = e => {
    this.setState({ primaryProductFilterValue: e.value });
  };
}

export default ProductsPage;
