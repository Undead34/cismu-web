import { Controls, Track, Options } from "./Controls/Controls";
import { AppState, AppDispatch } from "../../../store/store";
import { connect } from "react-redux";
import { Grid } from "@mui/material";
import React from "react";

interface Props {
  state?: {
    player: {
      volume: number;
      source: string | null;
      autoplay: boolean;
      paused: boolean;
      currentTime: number;
      playable: boolean;
    };
    playlist: {};
  };
  dispatch: AppDispatch;
}

interface State {
  playable: boolean;
  audio: HTMLAudioElement | null;
}

class CismuPlayer extends React.Component<Props, State> {
  store: Props["state"];
  state: State;

  constructor(props: Props) {
    super(props);
    this.store = this.props.state;
    this.state = {
      playable: false,
      audio: null,
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    if (this.state.audio && this.store) {
      this.state.audio.autoplay = this.store.player.autoplay;
      if (this.store.player.source) this.state.audio.src = this.store.player.source;
      this.setCurrentTime(this.store.player.currentTime);
      this.volume(this.store.player.volume);
      this.isPlayable(prevState);
    }
  }

  isPlayable(prevState: Readonly<State>) {
    if (this.state.audio?.src) {
      if (prevState.playable == this.state.playable) this.setState({ playable: true });
    }
  }

  onRefChange = (node: HTMLAudioElement) => {
    this.setState({ audio: node });
  };

  setCurrentTime(time: number) {
    if (this.state.audio && this.state.audio.src !== "") {
      this.state.audio.currentTime = time;
    }
  }

  async togglePlayPause() {
    if (this.state.audio) {
      if (this.state.audio.paused) await this.state.audio.play();
      else await this.state.audio.pause();
    }

    return Boolean(this.state.audio?.paused);
  }

  volume(value: number | null) {
    if (this.state.audio) {
      if (typeof value === "number") {
        this.state.audio.volume = value;
      }
    }
  }

  render() {
    return (
      <>
        <audio ref={this.onRefChange}></audio>
        <Grid container direction="row" bgcolor="#e1e1e1" height="75px" paddingX="20px" alignItems="center">
          <Grid item>
            <Controls playable={this.state.playable} togglePlayPause={() => this.togglePlayPause()} />
          </Grid>
          <Grid item flex="1">
            <Track disabled={!this.state.playable} />
          </Grid>
          <Grid item>
            <Options />
          </Grid>
        </Grid>
      </>
    );
  }
}

function mapStateToProps(state: AppState) {
  const { state_player } = state;
  return {
    state: {
      player: {
        volume: state_player.volume,
        source: state_player.source,
        autoplay: state_player.autoplay,
        paused: state_player.paused,
        currentTime: state_player.currentTime,
        playable: state_player.playable,
      },
      playlist: {},
    },
  };
}

export default connect(mapStateToProps)(CismuPlayer);
