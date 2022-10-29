import React, { Component } from 'react';
import './ServicesPage.css';
import ListingComponent from '../ListingComponent/ListingComponent';
import { SelectButton } from 'primereact/selectbutton';
import { ServiceFilters, ListItemTypes } from '../../utility/constants';

class ServicesPage extends Component {
  constructor(props) {
    super(props);
    let plumbing = {
      primaryServiceType: 'interior',
      secondaryServiceType: 'plumbing',
      provider: 'Star Plumbers Group',
      price: 20,
    };
    let furniture = {
      primaryServiceType: 'interior',
      secondaryServiceType: 'furniture',
      provider: 'Prime Furniture Shop',
      price: 20,
    };
    let interiorPainting = {
      primaryServiceType: 'interior',
      secondaryServiceType: 'painting',
      provider: 'A1 Painters',
      price: 20,
    };
    let electrical = {
      primaryServiceType: 'interior',
      secondaryServiceType: 'electrical',
      provider: 'Fixit Electric Works',
      price: 20,
    };
    let lawn = {
      primaryServiceType: 'exterior',
      secondaryServiceType: 'lawn',
      provider: 'Green Thumb Company',
      price: 20,
    };
    let exteriorPainting = {
      primaryServiceType: 'exterior',
      secondaryServiceType: 'painting',
      provider: 'Alpha Walls And Paints',
      price: 20,
    };
    let water = {
      primaryServiceType: 'exterior',
      secondaryServiceType: 'waterproofing',
      provider: 'Fixit Waterproofing',
      price: 20,
    };
    let servicesOffered = [
      plumbing,
      interiorPainting,
      furniture,
      electrical,
      lawn,
      exteriorPainting,
      water,
      plumbing,
      interiorPainting,
      furniture,
      electrical,
      lawn,
      exteriorPainting,
      water,
    ];
    this.state = {
      servicesOffered: servicesOffered,
      primaryServiceFilterValue: ServiceFilters.Interior.value,
      secondaryServiceFilterValue: ServiceFilters.Interior.subFilters[0].value,
    };
  }

  state = {};

  componentDidMount() {}

  render() {
    const {
      servicesOffered,
      primaryServiceFilterValue,
      secondaryServiceFilterValue,
    } = this.state;
    return (
      <div className="servicesPage">
        <span className="filtersRow">
          <SelectButton
            value={primaryServiceFilterValue}
            options={[ServiceFilters.Interior, ServiceFilters.Exterior]}
            onChange={e => this.handlePrimaryFilterChange(e)}
          ></SelectButton>
        </span>
        <span className="filtersRow">
          <SelectButton
            value={secondaryServiceFilterValue}
            options={
              primaryServiceFilterValue === ServiceFilters.Interior.value
                ? ServiceFilters.Interior.subFilters
                : ServiceFilters.Exterior.subFilters
            }
            onChange={e => this.handleSecondaryFilterChange(e)}
          ></SelectButton>
        </span>
        <span className="itemCarousel">
          <div className="grid">
            {servicesOffered
              .filter(
                listItem =>
                  listItem.primaryServiceType === primaryServiceFilterValue &&
                  listItem.secondaryServiceType === secondaryServiceFilterValue,
              )
              .map(listItem => (
                <div className="col-3">
                  <ListingComponent
                    listItem={listItem}
                    type={ListItemTypes.Service}
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
      <ListingComponent listItem={listItem} type={ListItemTypes.Service} />
    );
  };

  handlePrimaryFilterChange = e => {
    let secondaryServiceFilterValue =
      e.value === ServiceFilters.Interior.value
        ? ServiceFilters.Interior.subFilters[0].value
        : ServiceFilters.Exterior.subFilters[0].value;
    this.setState({
      primaryServiceFilterValue: e.value,
      secondaryServiceFilterValue: secondaryServiceFilterValue,
    });
  };

  handleSecondaryFilterChange = e => {
    this.setState({ secondaryServiceFilterValue: e.value });
  };
}

export default ServicesPage;
