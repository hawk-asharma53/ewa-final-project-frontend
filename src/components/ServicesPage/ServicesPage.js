import React, { Component } from 'react';
import './ServicesPage.css';
import ListingComponent from '../ListingComponent/ListingComponent';
import { SelectButton } from 'primereact/selectbutton';
import { ServiceFilters, ListItemTypes } from '../../utility/constants';
import { Carousel } from 'primereact/carousel';

class ServicesPage extends Component {
  constructor(props) {
    super(props);
    let plumbing = {
      serviceType: 'Plumbing',
      provider: 'Star Plumbers Inc.',
      price: 20,
    };
    let servicesOffered = [
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
          <div className='grid'>
            {
              servicesOffered.map( (listItem) => (
                <div className='col-3'>
                  <ListingComponent listItem={listItem} type={ListItemTypes.Service} />
                </div>
              ) )
            }
          </div>
          {/* <Carousel
            value={servicesOffered}
            itemTemplate={this.itemTemplate}
            numVisible={5}
            numScroll={1}
            autoplayInterval={3000}
          ></Carousel> */}
        </span>
      </div>
    );
  }

  itemTemplate = listItem => {
    return <ListingComponent listItem={listItem} type={ListItemTypes.Service} />;
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
