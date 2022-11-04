import CismuPlayerPlayer from "./CismuPlayer.Player";
import React from "react";

interface State {
  AudioTag: HTMLAudioElement | null;
}

class CismuPlayer extends React.Component<object, State> {
  AudioElement: React.RefObject<HTMLAudioElement>;

  constructor(props: object) {
    super(props);
    this.AudioElement = React.createRef();
    this.state = {
      AudioTag: null,
    };
  }

  componentDidMount(): void {
    this.setState(() => {
      return {
        AudioTag: this.AudioElement.current,
      };
    });
  }

  render() {
    return (
      <div className="cismu-player">
        <audio ref={this.AudioElement}></audio>
        <CismuPlayerPlayer audio={this.state.AudioTag} />
      </div>
    );
  }
}

export default CismuPlayer;
