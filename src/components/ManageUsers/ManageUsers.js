import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { getAllUsers } from 'api/dataAPI';
import { signup, updateUserProfile } from 'api/authAPI';

export const ManageUsers = () => {
  let emptyService = {
    email: '',
    password: '123456',
    user_first_name: '',
    user_last_name: '',
    user_type: '',
    storeId: 2,
  };

  const [state, setState] = useState({
    services: [],
  });
  const [user, setUser] = useState(emptyService);
  const [serviceDialog, setServiceDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getAllUsers()
      .then(function (response) {
        setState({ services: response?.data?.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getFirstName = rowData => {
    return rowData.user_first_name;
  };

  const getLastName = rowData => {
    return rowData.user_last_name;
  };

  const getUserType = rowData => {
    return (
      rowData.user_type.charAt(0).toUpperCase() + rowData.user_type.slice(1)
    );
  };

  const getEmail = rowData => {
    return rowData.user_email;
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Create New User"
          icon="pi pi-plus"
          className="mr-2"
          onClick={openNew}
        />
      </React.Fragment>
    );
  };

  const openNew = () => {
    setUser(emptyService);
    setSubmitted(false);
    setServiceDialog(true);
  };

  const rightToolbarTemplate = () => {
    return <React.Fragment></React.Fragment>;
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Manage Users</h5>
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
      </React.Fragment>
    );
  };

  const editService = user => {
    console.log(user);
    setUser({ ...user });
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
    user.email = user.user_email;
    delete user.user_email;
    if (user.user_id == null) {
      await signup(user);
    } else {
      await updateUserProfile(user, user.user_id);
    }
    getAllUsers()
      .then(function (response) {
        setState({ services: response?.data?.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    setServiceDialog(false);
    setUser(emptyService);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _service = { ...user };
    _service[`${name}`] = val;

    setUser(_service);
  };

  return (
    <div className="px-4">
      <div className="card ">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>
        {state.services !== undefined ? (
          <DataTable
            value={state.services}
            responsiveLayout="scroll"
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            rows={10}
            rowsPerPageOptions={[10, 20, 50]}
            header={header}
          >
            <Column
              body={getUserType}
              field="title"
              header="User Type"
            ></Column>
            <Column body={getFirstName} header="First Name"></Column>
            <Column body={getLastName} header="Last Name"></Column>
            <Column body={getEmail} header="Email"></Column>
            <Column body={actionBodyTemplate} exportable={false}></Column>
          </DataTable>
        ) : (
          <></>
        )}
      </div>

      <Dialog
        visible={serviceDialog}
        style={{ width: '550px' }}
        header="User Details"
        modal
        className="p-fluid"
        footer={serviceDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="user_first_name">First Name</label>
          <InputText
            id="user_first_name"
            value={user.user_first_name}
            onChange={e => onInputChange(e, 'user_first_name')}
            required
            autoFocus
          />
          {submitted && !user.user_first_name && (
            <small className="p-error">First Name is required.</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="user_last_name">Last Name</label>
          <InputText
            id="user_last_name"
            value={user.user_last_name}
            onChange={e => onInputChange(e, 'user_last_name')}
          />
        </div>
        <div className="field">
          <label htmlFor="user_email">Email</label>
          <InputText
            id="user_email"
            value={user.user_email}
            onChange={e => onInputChange(e, 'user_email')}
            required
          />
          {submitted && !user.user_email && (
            <small className="p-error">Email is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="title">Category</label>
          <Dropdown
            required
            optionLabel="name"
            optionValue="code"
            value={user.user_type}
            options={[
              { name: 'Customer', code: 'customer' },
              { name: 'Admin', code: 'admin' },
              { name: 'Manager', code: 'manager' },
            ]}
            onChange={e => onInputChange(e, 'user_type')}
            placeholder="Select a User Type"
          />
          {submitted && !user.user_type && (
            <small className="p-error">User Type is required.</small>
          )}
        </div>
      </Dialog>
    </div>
  );
};
