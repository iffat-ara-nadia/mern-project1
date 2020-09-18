import React, { Component } from "react";
import defaultImage from "../assets/images.png";
import axios from "axios";

class AddItem extends Component {
  state = {
    data: {
      name: "",
      description: "",
      image: "",
      price: ""
    }
  };

  handleChange = ({ currentTarget }) => {
    const data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value;
    this.setState({ data });
  };

  handleSubmit = e => {
    e.preventDefault();

    //call the server
    console.log("Submitted");

    this.doSubmit();
  };

  doSubmit = async () => {
    const response = await axios.post("http://localhost:5200/api/items", {
      name: this.state.data.name,
      description: this.state.data.description,
      image: this.state.data.image,
      price: this.state.data.price
    });
    console.log(response);
    window.location = "/";
  };

  render() {
    const { data } = this.state;

    const isImgReady = data.image;
    let imagePreview;

    if (isImgReady) {
      imagePreview = <img src={data.image} alt="product " />;
    } else {
      imagePreview = <img src={defaultImage} alt="default preview" />;
    }

    return (
      <React.Fragment>
        <section>
          <div className="banner"></div>
          <h2>Create a new item</h2>

          <div className="itemCreation">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Product Name: </label>
                <input
                  type="text"
                  name="name"
                  value={this.state.data.name}
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Product Description: </label>
                <textarea
                  name="description"
                  value={this.state.data.description}
                  className="form-control"
                  onChange={this.handleChange}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="price">Product Price: </label>
                <input
                  type="number"
                  min="0"
                  name="price"
                  value={this.state.data.price}
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Product Image: </label>
                <input
                  type="text"
                  name="image"
                  value={this.state.data.image}
                  className="form-control"
                  onChange={this.handleChange}
                />
              </div>

              <input type="submit" value="create post" />
            </form>

            <div className="preview">
              {imagePreview}
              <p>
                Product Name: <strong> {this.state.data.name}</strong>
              </p>
              <p>
                Product Description:{" "}
                <strong> {this.state.data.description}</strong>{" "}
              </p>
              <p>
                Product Price: <strong> {this.state.data.price} </strong>
              </p>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default AddItem;
