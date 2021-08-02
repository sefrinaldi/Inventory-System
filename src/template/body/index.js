import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// import Swal from "sweetalert2";

import {
  Home,
  About,
  Login,
  Pembelian,
  LabaRugi,
  ProductList,
  Penjualan,
  Form,
  Diskon,
} from "../page";
import AddForm from "../page/form/AddForm";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      detailProduct: {},
      index: 0,
      userEdit: {},
      penjualanList: [],
      diskon: {},
      addProduct: {},
      oldQty: {},
      dataPembelian: [],
    };
  }

  componentDidMount() {
    const urlFetch = fetch(
      "https://raw.githubusercontent.com/cahya93/JsonAPI/main/inventory.json"
    );
    urlFetch
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((resJson) => {
        const dataArr = resJson.map((data) => {
          return {
            id: data.id,
            nameProduct: data.nameProduct,
            hargaBeli: data.hargaBeli,
            hargaJual: data.hargaJual,
            qty: data.qty,
            thumbnailUrl: data.thumbnailUrl,
            diskon: data.diskon,
          };
        });
        console.log("JSONDATA:", dataArr);
        this.setState({
          productList: dataArr,
        });
      });
  }

  getlistPenjualan = (data) => {
    console.log("list penjualan in body", data);

    this.setState(
      {
        penjualanList: data,
      },
      () => this.props.goToPage("penjualan")
    );
  };

  clearUserEdit = () => this.setState({ detailProduct: {} });
  clearEdit = () => this.setState({ userEdit: {} });

  // TRIGER ID KE FORM PEMBELIAN
  detailHandler = (id) => {
    const user = this.state.productList[id];
    this.setState({
      detailProduct: user,
      index: id,
    });
    console.log("id", id);
  };

  // ADD DATA TO TABLE
  addStok = (newUser) => {
    console.log("data baruuuuuuuuuuuuu", newUser);

    let copyProduct = this.state.productList;
    console.log("ini copy student : ", copyProduct);

    copyProduct.splice(this.state.index, 1, newUser);
    this.setState({
      productList: copyProduct,
    });
  };

  // UNTUK PULL DATA ID DARI PRODUCT LIST
  tambahStok = (data) => {
    console.log("data baruuuuuuuuuuuuu", data);

    let copyProduct = this.state.productList;
    const filterData = copyProduct.filter((product) => product.id === data);

    this.setState({
      oldQty: filterData[0],
    });

    console.log("copyproducty", filterData[0]);
  };

  loginStatusCheck = (e) => {
    const { loginStatus } = this.props;
    console.log("value", e.target.value);
    console.log("status", loginStatus);
  };

  renderPage = () => {
    // const page = this.props.page;
    const { userEdit } = this.state;
    const { loginStatus } = this.props;
    console.log("Status", loginStatus);

    return <Switch>
      <Route path="/home">
        <Home
          datas={this.state.productList}
          dataBeli={this.addDataPembelian}
          sendData={this.state.dataPembelian}
        />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/login">
        <Login changeStat={this.props.changeStatus} />;
      </Route>

      <Route path="/pembelian">
        <Pembelian
          oldQty={this.state.oldQty}
          detailProduct={this.state.detailProduct}
          addPembelian={this.addPembelian}
          goToPage={this.props.goToPage}
          clearUserEdit={this.clearUserEdit}
          changeStatusStok={this.changeStatusStok}
          tambahStok={this.tambahStok}
          addStok={this.addStok}
        />
      </Route>

      <Route path="/labaRugi">
        <LabaRugi sentData={this.state.dataPembelian} />;
      </Route>

      <Route path="/AddForm">
        <AddForm
          addProduct={this.addProduct}
          selectedUser={userEdit}
          resetUserEdit={this.clearEdit}
          saveUser={this.updateUsers}
          goToPage={this.props.goToPage}
        />
      </Route>

      <Route path="form">
        <Form
          selectedUser={userEdit}
          resetUserEdit={this.clearEdit}
          saveUser={this.updateUsers}
          goToPage={this.props.goToPage}
        />
      </Route>

      <Route path="/productList">
        <ProductList
          datas={this.state.productList}
          updateUser={this.setUserEdit}
          setDiskon={this.editDiskon}
          listProduct={this.getlistPenjualan}
          // goToPage={this.props.goToPage}
          detailHandler={this.detailHandler}
          addProduct={this.addProduct}
          tambahStok={this.tambahStok}
          loginStatus={loginStatus}
        />
      </Route>

      <Route path="/penjualan">
        <Penjualan listProduct={this.state.penjualanList} />;
      </Route>

      <Route path="/diskon">
        <Diskon
            diskon={this.state.diskon}
            updateDiskon={this.updateDiskon}
            redirect={this.props.goToPage}
          />
      </Route>
    </Switch>


    // if (page === "productList" && loginStatus === true)
    //   return (
        
    //   );        

  };
  addDataPembelian = (data) => {
    this.setState({
      dataPembelian: data,
    });
  };
  updateUsers = (newProduct) => {
    console.log(newProduct);
    if (newProduct.id === "") {
      const oldProduct = this.state.productList;
      oldProduct.push({
        id: oldProduct.length
          ? Math.max(...oldProduct.map((product) => product.id)) + 1
          : 1,
        nameProduct: newProduct.nameProduct,
        hargaBeli: newProduct.hargaBeli,
        hargaJual: newProduct.hargaJual,
        qty: newProduct.qty,
        thumbnailUrl: newProduct.thumbnailUrl,
        diskon: newProduct.diskon,
      });
      return this.setState(
        {
          productList: oldProduct,
        },
        () => this.props.goToPage("productList")
      );
    }
    const oldProduct = this.state.productList;
    const idxProduct = oldProduct
      .map((product) => product.id)
      .indexOf(newProduct.id);
    console.log(idxProduct);
    oldProduct.splice(idxProduct, 1, newProduct);
    this.setState(
      {
        productList: oldProduct,
      },
      () => this.props.goToPage("productList")
    );
  };

  editDiskon = (data) => {
    console.log("diskon in body: ", data);

    this.setState(
      {
        diskon: data,
      },
      () => this.props.goToPage("diskon")
    );
  };

  updateDiskon = (data) => {
    const oldData = this.state.productList;

    const filterData = oldData.filter((product) => product.id === data.id);

    const idx = oldData.findIndex((product) => product.id === data.id);

    let newDiskon = data.diskon <= 100 ? (data.diskon > 0 ? data.diskon : 0) : 100

    oldData.splice(idx, 1, {
      id: data.id,
      nameProduct: data.nameProduct,
      hargaBeli: filterData[0].hargaBeli,
      hargaJual: filterData[0].hargaJual,
      qty: filterData[0].qty,
      thumbnailUrl: data.thumbnailUrl,
      diskon: newDiskon ? newDiskon : 0,
    });

    this.setState(
      {
        productList: oldData,
        diskon: {},
      },
      console.log("master : ", this.state.productList)
    );
  };

  setUserEdit = (userEdit) =>
    this.setState({ userEdit }, () => this.props.goToPage("form"));

  addProduct = (inputProduct) => {
    this.setState({
      productList: [
        ...this.state.productList,
        {
          id: Math.max(
            ...this.state.productList.map((product) => {
              return product.id + 1;
            })
          ),
          nameProduct: inputProduct.nameProduct,
          hargaBeli: inputProduct.hargaBeli,
          hargaJual: inputProduct.nameJual,
          qty: inputProduct.qty,
        },
      ],
    });
    this.props.goToPage("inputProduct");
    console.log("Input Product >>>", inputProduct);
    console.log("Cek Bang Boy >>>", this.state.productList);
  };

  render() {
    return (
      <>
        <div>{this.renderPage()}</div>
      </>
    );
  }
}

export default Body;
