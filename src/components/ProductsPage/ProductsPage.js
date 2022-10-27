import React, { Component } from 'react';
import './ProductsPage.css';
import ListingComponent from '../ListingComponent/ListingComponent';
import { SelectButton } from 'primereact/selectbutton';
import { ProductFilters, ListItemTypes } from '../../utility/constants';
import { Carousel } from 'primereact/carousel';

class ProductsPage extends Component {
  constructor(props) {
    super(props);
    let plumbing = {
      productName: 'Woodworking Kit',
      provider: 'Amazon Inc.',
      price: 199.49,
    };
    let productsOffered = [
      plumbing,
      plumbing,
      plumbing,
      plumbing,
      plumbing,
      plumbing,
      plumbing,
      plumbing,
      plumbing,
      plumbing,
      plumbing,
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
          <Carousel
            value={productsOffered}
            itemTemplate={this.itemTemplate}
            numVisible={5}
            numScroll={1}
            autoplayInterval={3000}
          ></Carousel>
        </span>
      </div>
    );
  }

  itemTemplate = listItem => {
    return <ListingComponent listItem={listItem} type={ListItemTypes.Product} />;
  };

  handlePrimaryFilterChange = e => {
    this.setState({ primaryProductFilterValue: e.value });
  };
}

export default ProductsPage;
