import React from "react";
import Graph from "./Graph.js";
import { Navbar, Button, InputGroup, FormControl } from "react-bootstrap";
import SearchBar from "./SearchBar.js";
import Option from "./Option.js";
import SectorSelector from "./SectorSelector.js";

class Interface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      stock: "",
      works: true,
      days: "",

      //dtDays: '',
      dtActive: false,

      //smaDays: '',
      smaActive: false,

      //pDays: '',
      pActive: false,

      //vBucket: '',
      vActive: false,
    };
    this.getStock = this.getStock.bind(this);
    this.getSMA = this.getSMA.bind(this);
    this.getPercent = this.getPercent.bind(this);
    this.getVolume = this.getVolume.bind(this);
    this.getDT = this.getDT.bind(this);
    this.resetButton = this.resetButton.bind(this);
    this.setDays = this.setDays.bind(this);
  }

  async getStock(stock) {
    await this.setState({
      stock: stock,
    });

    console.log("UPDATED STOCK", this.state.stock);
  }

  getSMA(selected) {
    this.setState({
      smaActive: selected,
      reset: false,
    });
    //console.log('Simple Moving Average Days', this.state.smaDays)
  }

  getPercent(selected) {
    this.setState({
      pActive: selected,
      reset: false,
    });
    //console.log('Percentage Days', this.state.pDays)
  }

  getVolume(selected) {
    this.setState({
      vActive: selected,
      reset: false,
    });
    //console.log('Volume Days', this.state.vBucket)
  }

  getDT(selected) {
    this.setState({
      dtActive: selected,
      reset: false,
    });
  }

  setDays(days) {
    this.setState({
      days: days,
    });
  }

  resetButton() {
    console.log("Reset");
    this.setState({
      stock: "",
      days: "",
      smaActive: false,
      pActive: false,
      vActive: false,
      dtActive: false,
      reset: true,
    });
  }

  render() {
    return (
      <div className="front-page">
        <SearchBar handler={this.getStock} reset={this.state.reset} />
        <div className="col-3">
          <h3>Queries</h3>
          <FormControl
            type="text"
            className="mr-sm-2"
            name="days"
            value={this.state.days}
            onChange={(e) => {
              const target = e.target;
              this.setState({ days: target.value });
            }}
            placeHolder="days"
          />
          <Option
            handler={this.getSMA}
            pHolder="SMA Days"
            reset={this.state.reset}
          />
          <Option
            handler={this.getPercent}
            pHolder="Percentage Change"
            reset={this.state.reset}
          />
          <Option
            handler={this.getVolume}
            pHolder="Volume"
            reset={this.state.reset}
          />
          <Option
            handler={this.getDT}
            pHolder="Dollars Traded"
            reset={this.state.reset}
          />
          <Option
            handler={() => console.log("No functionality yet.")}
            pHolder="Query 5"
            reset={this.state.reset}
          />
          <Button variant="danger" onClick={this.resetButton}>
            Reset
          </Button>
        </div>
        {this.state.stock ? (
          <Graph
            stock={this.state.stock}
            days={this.state.days}
            smaActive={this.state.smaActive}
            pActive={this.state.pActivated}
            vActive={this.state.vActive}
            dtActive={this.state.dtActive}
          />
        ) : (
          <p>Nothing Loaded...</p>
        )}
      </div>
    );
  }
}

export default Interface;
