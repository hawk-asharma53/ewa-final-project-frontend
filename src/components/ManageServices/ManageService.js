import React, { useEffect, useState } from 'react';
import useStore from 'store/AuthState';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getProductCategory, getServiceCategory, productCategories } from 'utility/globalFunctions';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { addProduct, addService, updateProduct, updateService } from 'api/dataAPI';
import { InputSwitch } from 'primereact/inputswitch';

export const ManageServicesPage = () => {
  const categories = [
    { name: 'Handyman', code: 9 },
    { name: 'Moving', code: 10 },
    { name: 'Furniture Assembly', code: 11 },
    { name: 'Mounting & Installation', code: 12 },
    { name: 'Cleaning', code: 13 },
    { name: 'Yardwork Services', code: 14 },
  ];

  const isActive = [
    { name: 'Yes', code: 1 },
    { name: 'No', code: 2 },
  ];

  let emptyService = {
    id: null,
    title: '',
    categoryid: 1,
    subcategory: '',
    image: '',
    rating: 0.0,
    price: 0.0,
    isActive: 1,
  };

  const [state, setState] = useState({
    services: [],
  });
  const [globalFilter, setGlobalFilter] = useState(null);
  const [service, setService] = useState(emptyService);
  const [serviceDialog, setServiceDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  let store = useStore();

  useEffect(() => {
    store.getAllServices();
  }, []);

  useEffect(() => {
    setState({ services: store.serviceData });
  }, [store.serviceData]);

  const categoryBodyTemplate = rowData => {
    return getServiceCategory(rowData.categoryid);
  };

  const isActiveBodyTemplate = rowData => {
    return rowData.isActive == 1 ? 'Yes' : 'No';
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Create New Service"
          icon="pi pi-plus"
          className="mr-2"
          onClick={openNew}
        />
        {/* <Button label="Delete" icon="pi pi-trash" className="p-button-danger"/> */}
      </React.Fragment>
    );
  };

  const openNew = () => {
    setService(emptyService);
    setSubmitted(false);
    setServiceDialog(true);
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        {/* <Button label="Export" icon="pi pi-upload" className="p-button-help" /> */}
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Manage Services</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={e => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const actionBodyTemplate = rowData => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded mr-2"
          onClick={() => editService(rowData)}
        />
        {/* <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => confirmDeleteProduct(rowData)}
        /> */}
      </React.Fragment>
    );
  };

  const editService = service => {
    console.log(service);
    setService({ ...service });
    setServiceDialog(true);
  };

  const serviceDialogFooter = () => {
    return (
      <React.Fragment>
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="p-button-text"
          onClick={hideDialog}
        />
        <Button
          label="Save"
          icon="pi pi-check"
          className="p-button-text"
          onClick={saveService}
        />
      </React.Fragment>
    );
  };

  const hideDialog = () => {
    setSubmitted(false);
    setServiceDialog(false);
  };

  const saveService = async () => {
    setSubmitted(true);
    console.log(service);
    if (service.id == null) {
      await addService(service);
    } else {
      await updateService(service);
    }
    store.getAllServices();
    setServiceDialog(false);
    setService(emptyService);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _service = { ...service };
    _service[`${name}`] = val;

    setService(_service);
  };

  const onPriceChange = e => {
    let _service = { ...service };
    _service[`price`] = e;
    setService(_service);
  };

  const setIsActive = e => {
    let _service = { ...service };
    _service[`isActive`] = e;
    setService(_service);
  };

  const setCatgory = e => {
    let _service = { ...service };
    _service[`categoryid`] = e;
    setService(_service);
  };

  return (
    <div className="px-4">
      {/* Manage Products */}
      <div className="card ">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>
        {state.services != undefined ? (
          <DataTable
            value={state.services}
            responsiveLayout="scroll"
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            rows={10}
            rowsPerPageOptions={[10, 20, 50]}
            header={header}
            globalFilter={globalFilter}
          >
            <Column
              field="title"
              header="Title"
              style={{ maxWidth: '12rem' }}
            ></Column>
            <Column body={categoryBodyTemplate} header="Category"></Column>
            <Column field="price" header="Price"></Column>
            <Column field="rating" header="Rating"></Column>
            <Column body={isActiveBodyTemplate} header="Is Active"></Column>
            <Column body={actionBodyTemplate} exportable={false}></Column>
          </DataTable>
        ) : (
          <></>
        )}
      </div>

      <Dialog
        visible={serviceDialog}
        style={{ width: '550px' }}
        header="Service Details"
        modal
        className="p-fluid"
        footer={serviceDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="title">Title</label>
          <InputText
            id="title"
            value={service.title}
            onChange={e => onInputChange(e, 'title')}
            required
            autoFocus
          />
          {submitted && !service.title && (
            <small className="p-error">Title is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="title">Category</label>
          <Dropdown
            optionLabel="name"
            optionValue="code"
            value={service.categoryid}
            options={categories}
            onChange={e => setCatgory(e.value)}
            placeholder="Select a Category"
          />
        </div>
        <div className="field">
          <label htmlFor="image">Image</label>
          <InputText
            id="image"
            value={service.image}
            onChange={e => onInputChange(e, 'image')}
          />
        </div>
        <div className="field">
          <label htmlFor="price">Price</label>
          <InputNumber
            id="price"
            value={service.price}
            onChange={e => onPriceChange(e.value)}
            minFractionDigits={2}
            required
          />
          {submitted && !service.price && (
            <small className="p-error">Price is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="isActive">Is Active</label>
          <InputSwitch
            trueValue={1}
            falseValue={0}
            checked={service.isActive}
            onChange={e => setIsActive(e.value)}
          />
        </div>
      </Dialog>
    </div>
  );
};
