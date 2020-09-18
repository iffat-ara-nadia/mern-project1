import React, { Component } from "react";
import axios from "axios";

class EditItem extends Component {
  state = {
    data: {
      name: "",
      description: "",
      image: "",
      price: "",
    },
  };

  async componentDidMount() {
    const itemId = this.props.match.params.id;

    const { data: item } = await axios.get(
      "http://localhost:5200/api/items/" + itemId
    );
    console.log(item);
    this.setState({ data: this.mapToViewModel(item) });
  }

  mapToViewModel(item) {
    return {
      _id: item._id,
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.price,
    };
  }

  saveItem(item) {
    if (item._id) {
      const body = { ...item };
      delete body._id;
      return axios.put("http://localhost:5200/api/items/" + item._id, body);
    }
  }

  doSubmit = async () => {
    await this.saveItem(this.state.data);
    window.location = "/";
  };

  handleSubmit = (e) => {
    e.preventDefault();

    //call the server
    console.log("Submitted");

    this.doSubmit();
  };

  handleDelete = async () => {
    const itemId = this.props.match.params.id;
    const { data: item } = await axios.get(
      "http://localhost:5200/api/items/" + itemId
    );
    //console.log(item);
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      const response = await axios.delete(
        "http://localhost:5200/api/items/" + item._id
      );
      //console.log(response);
      window.location = "/";
    } else {
      console.log("Item was not deleted");
    }
  };

  handleChange = ({ currentTarget }) => {
    const data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value;
    this.setState({ data });
  };

  render() {
    return (
      <React.Fragment>
        <section>
          <div className="banner"></div>
          <h2>Update an item</h2>

          <div className="itemCreation">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Product Name: </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.data.name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Product Description: </label>
                <textarea
                  name="description"
                  onChange={this.handleChange}
                  className="form-control"
                  value={this.state.data.description}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="price">Product Price: </label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  value={this.state.data.price}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Product Image: </label>
                <input
                  type="text"
                  name="image"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.data.image}
                />
              </div>

              <input type="submit" value="Update post" />
            </form>

            <div className="preview">
              <img src={this.state.data.image} alt="product" />
              <p>
                Product Name: <strong> {this.state.data.name}</strong>
              </p>
              <p>
                Product Description:
                <strong> {this.state.data.description}</strong>
              </p>
              <p>
                Product Price: <strong>${this.state.data.price} </strong>
              </p>
              <button className="delete" onClick={this.handleDelete}>
                Delete this Item
              </button>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default EditItem;
