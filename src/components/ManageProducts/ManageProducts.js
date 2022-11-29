import React, { useEffect, useState } from 'react';
import useStore from 'store/AuthState';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getProductCategory, productCategories } from 'utility/globalFunctions';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { addProduct } from 'api/dataAPI';

export const ManageProductsPage = () => {
    const categories = [
        {name: 'Paint', code: 1},
        {name: 'Heating, Cooling & Air Quality', code: 2},
        {name: 'Garage & Storage', code: 3},
        {name: 'Home Safety', code: 4},
        {name: 'Kitchen Renovation', code: 5},
        {name: 'Wall Stickers & Coverings', code: 6},
        {name: 'Window & Window Supplies', code: 7},
        {name: 'Bathroom Renovation', code: 8},
    ];
  
    let emptyProduct = {
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
    products: [],
  });
  const [globalFilter, setGlobalFilter] = useState(null);
  const [product, setProduct] = useState(emptyProduct);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  let store = useStore();

  useEffect(() => {
    store.getAllProducts();
  }, []);

  useEffect(() => {
    setState({ products: store.productsData });
  }, [store.productsData]);

  const categoryBodyTemplate = rowData => {
    return getProductCategory(rowData.categoryid);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Create New Product"
          icon="pi pi-plus"
          className="mr-2"
          onClick={openNew}
        />
        {/* <Button label="Delete" icon="pi pi-trash" className="p-button-danger"/> */}
      </React.Fragment>
    );
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
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
      <h5 className="mx-0 my-1">Manage Products</h5>
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
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const editProduct = product => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = product => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProductDialogFooter = () => { return  (
    <React.Fragment>
      {/* <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} /> */}
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );}

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const productDialogFooter = () => { return (
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
        onClick={saveProduct}
      />
    </React.Fragment>
  );}

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };
  const deleteProduct = () => {
    //TODO : Delete action
  };

  const saveProduct = async () => {
    setSubmitted(true);
    // console.log(product)
    await addProduct( product )
    store.getAllProducts();
    setProductDialog(false);
    setProduct(emptyProduct);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onPriceChange = (e) => {
    let _product = { ...product };
    _product[`price`] = e;
    setProduct(_product);
  };

  const setCatgory = e => {
    let _product = { ...product };
    _product[`categoryid`] = e;
    setProduct(_product);
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
        {state.products != undefined ? (
          <DataTable
            value={state.products}
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
            <Column body={actionBodyTemplate} exportable={false}></Column>
          </DataTable>
        ) : (
          <></>
        )}
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: '550px' }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="title">Title</label>
          <InputText
            id="title"
            value={product.name}
            onChange={e => onInputChange(e, 'title')}
            required
            autoFocus
          />
          {submitted && !product.title && <small className="p-error">Title is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="title">Category</label>
          <Dropdown
             optionLabel="name" 
             optionValue="code"
            value={product.categoryid}
            options={categories}
            onChange={e => setCatgory(e.value)}
            placeholder="Select a Category"
          />
        </div>
        <div className="field">
          <label htmlFor="image">Image</label>
          <InputText
            id="image"
            value={product.name}
            onChange={e => onInputChange(e, 'image')}
          />
        </div>
        <div className="field">
          <label htmlFor="price">Price</label>
          <InputNumber
            id="price"
            value={product.name}
            onChange={e => onPriceChange(e.value)}
            minFractionDigits={2}
            required
          />
          {submitted && !product.price && <small className="p-error">Price is required.</small>}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};
