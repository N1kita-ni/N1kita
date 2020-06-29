import * as React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as numeral from 'numeral';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { IUser, ICatalogProduct } from '@typings/state/index';
import '@styles/ProductDetails.css';

interface Props {
  loggedUser: IUser;
  product: ICatalogProduct;
}

interface State {
  postData: {
    user: string;
    product: string;
    quantity: number;
  };
  snackbarOpen: boolean;
}

class ProductDetails extends React.Component<Props, State> {
  state = {
    postData: {
      user: this.props.loggedUser._id,
      product: this.props.product._id,
      quantity: 1
    },
    snackbarOpen: false
  }

  onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    this.setState((prevState: State) => ({
      postData: { ...prevState.postData, quantity: parseInt(value) }
    }));
  }

  addToCart = async () => {
    await axios.post('/api/cart', this.state.postData);

    this.setState({ snackbarOpen: true });
  }

  render() {
    const {
      loggedUser,
      product: { info }
    } = this.props;

    return (
      <div className="product-details-container">
        <h1>{info.name}</h1>
        <div className="product-details">
          <div className="product-image">
            <img src={info.photo} />
          </div>
          <div className="product-info">
            <table>
              <tr>
                <th>Model</th>
                <td>{info.name}</td>
              </tr>
              <tr>
                <th>Color</th>
                <td>{info.color}</td>
              </tr>
            </table>
            <Snackbar
              open={this.state.snackbarOpen}
              message={loggedUser ? 'Item added to your cart.' : 'You must be logged in!'}
              autoHideDuration={4000}
              bodyStyle={loggedUser ? { 'background': '#64DD17' } : { 'background': '#F44336' }}
            />
          </div>
        </div>
        <div className="product-handle">
          <div className="left">
            <RaisedButton
              containerElement={<Link to="/" />}
              className="btn"
              label="Back to catalog"
              labelPosition="after"
              secondary={true}
              icon={<KeyboardArrowLeft />}
            />
          </div>
          <div className="right">
            <div className="price">
              <span className="price-text">Price: </span>
              <span className="price-num">{numeral(info.price).format('$0,0.00')}</span>
            </div>
            <div className="quantity">
              <span className="price-text">Quantity: </span>
              <span><input type="number" value={this.state.postData.quantity} min="1" max="5" onChange={this.onQuantityChange} /></span>
            </div>
            <div className="btn">
              <RaisedButton
                onClick={this.addToCart}
                label="Add to cart"
                labelPosition="before"
                primary={true}
                icon={<AddShoppingCart />}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
