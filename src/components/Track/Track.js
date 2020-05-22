import React from "react";
import "./Track.css";

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  /**
   * Calls upon the add track function in App component
   */
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  /**
   * Calls upon the remove track function in App component
   */
  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    let actionButton;
    if (this.props.isRemoval) {
      actionButton = (
        <button className="Track-action" onClick={this.removeTrack}>
          -
        </button>
      );
    } else {
      actionButton = (
        <button className="Track-action" onClick={this.addTrack}>
          +
        </button>
      );
    }
    return actionButton;
  }

  render() {
    const track = this.props.track;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{track.name}</h3>
          <p>{`${track.artist} | ${track.album}`}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
