import React, { Component } from "react";
import "./form.css";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.selectedUser.id ? props.selectedUser.id : "",
      nameProduct: props.selectedUser.nameProduct
        ? props.selectedUser.nameProduct
        : "",
      hargaBeli: props.selectedUser.hargaBeli
        ? props.selectedUser.hargaBeli
        : "",
      hargaJual: props.selectedUser.hargaJual
        ? props.selectedUser.hargaJual
        : "",
      qty: props.selectedUser.qty ? props.selectedUser.qty : "",
      thumbnailUrl: props.selectedUser.thumbnailUrl
        ? props.selectedUser.thumbnailUrl
        : "",
      diskon: props.selectedUser.diskon ? props.selectedUser.diskon : 0,
      redirect: false
    };
  }

  onSaveHandler = () => {
    const { id, nameProduct, hargaBeli, hargaJual, qty, thumbnailUrl, diskon } =
      this.state;
    this.props.saveUser({
      id,
      nameProduct,
      hargaBeli,
      hargaJual,
      qty,
      thumbnailUrl,
      diskon,
    });
  };

  AddNewHandler = () => {
    const { id, nameProduct, hargaBeli, hargaJual, qty, thumbnailUrl, diskon } =
      this.state;
    if (
      nameProduct === "" ||
      hargaBeli === "" ||
      hargaJual === "" ||
      qty === "" ||
      thumbnailUrl === ""
    )
      return Swal.fire("Waahhh ... ", "yang bener dong", "error");

    this.props.saveUser({
      id,
      nameProduct,
      hargaBeli,
      hargaJual,
      qty,
      thumbnailUrl,
      diskon,
    });
    
    this.setState({
      redirect : true
    })

    return Swal.fire("Naaaahhh ... ", "gitu doong bener", "success");

  };
  setValue = (e) => this.setState({ [e.target.name]: e.target.value });

  componentWillUnmount() {
    this.props.resetUserEdit();
  }

  cancel = () => {
    // this.props.goToPage("productList");
    this.setState({
      redirect: true
    })
  };

  render() {
    const { id, nameProduct, hargaBeli, hargaJual, qty, thumbnailUrl, diskon } =
      this.state;
    console.log(this.state);

    if (this.state.redirect)
      return <Redirect to="/productList" />

    return (
      <table className="MyTable">
        <tbody>
          <tr>
            <td>Name Product</td>
            <td>
              <input type="hidden" value={id} />
              <input
                type="text"
                name="nameProduct"
                value={nameProduct}
                required
                onChange={this.setValue}
              />
            </td>
          </tr>
          <tr>
            <td>Foto Product</td>
            <td>
              <input
                type="text"
                name="thumbnailUrl"
                value={thumbnailUrl}
                onChange={this.setValue}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Harga Beli</td>
            <td>
              <input
                type="text"
                name="hargaBeli"
                value={hargaBeli}
                onChange={this.setValue}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Harga Jual</td>
            <td>
              <input
                type="text"
                name="hargaJual"
                value={hargaJual}
                onChange={this.setValue}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Quantity</td>
            <td>
              <input
                type="text"
                name="qty"
                value={qty}
                onChange={this.setValue}
                required
              />
            </td>
          </tr>
          <tr>
            <td colSpan="3" align="left">
              <button className="buttonAddNew" onClick={this.AddNewHandler}>
                Add New
              </button>
              <button className="buttonAddNew" onClick={this.cancel}>
                Cancel
              </button>
            </td>
          </tr>
          <input type="hidden" value={diskon} />
        </tbody>
      </table>
    );
  }
}

export default AddForm;
