import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Home extends Component {
  state = {
    items: [],
  };

  async componentDidMount() {
    //i wrote const items instead of { data: items }
    const { data: items } = await axios.get("http://localhost:5200/api/items");
    // console.log(items);
    this.setState({ items });
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <h1>ASTHETIC</h1>
          <h3
            style={{ textAlign: "center", marginTop: "30px", color: "white" }}
          >
            Online Paintings Shop
          </h3>
        </header>
        <section>
          <h2>Items</h2>
          <div className="itemsContainer">
            {this.state.items.map((item) => (
              <div className="item" key={item._id}>
                <div
                  className="cover"
                  style={{ backgroundImage: "url(" + item.image + ")" }}
                ></div>
                <div>
                  <Link to={"/edit/" + item._id}>
                    <h3>{item.name}</h3>
                  </Link>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
