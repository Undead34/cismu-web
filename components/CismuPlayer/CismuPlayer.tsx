import CismuPlayerPlayer from "./CismuPlayer.Player";
import Player, { WebPlayer } from "../../WebPlayer";
import { connect } from "react-redux";
import "./CismuPlayer.scss";
import React from "react";

interface Props {}

class CismuPlayer extends React.Component {
  webPlayer: Player;
  constructor(props: Props) {
    super(props);
    this.webPlayer = WebPlayer;
  }

  render() {
    let playerProps = {
      play: () => this.webPlayer.play(),
      pause: () => this.webPlayer.pause(),
      stop: () => this.webPlayer.stop(),
      next: () => this.webPlayer.next(),
      prev: () => this.webPlayer.prev(),
      set_music: (index: number) => this.webPlayer.set_music(index),
      onVolumeChange: (val: number) => (this.webPlayer.volume = val),
      onCurrentTimeChange: (val: number) => (this.webPlayer.currentTime = val),
    };

    return (
      <div className="cismu-player">
        <CismuPlayerPlayer {...playerProps} />
      </div>
    );
  }
}

export default connect()(CismuPlayer);
