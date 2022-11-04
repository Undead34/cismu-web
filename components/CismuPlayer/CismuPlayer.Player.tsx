import { Controls, Track, Options } from "./Controls/Controls";
import { AppState, AppDispatch } from "../../store/store";
import { setPlayable } from "../../store/slice/player.state";
import { connect } from "react-redux";
import { Grid } from "@mui/material";
import React from "react";

interface Props {
  audio: HTMLAudioElement | null;
  state?: {
    player: {
      volume: number;
      source: string;
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
}

class CismuPlayerPlayer extends React.Component<Props, State> {
  AudioElement: HTMLAudioElement | null;
  store: Props["state"];
  state: State;

  constructor(props: Props) {
    super(props);
    this.AudioElement = this.props.audio;
    this.store = this.props.state;
    this.state = {
      playable: false,
    };

    if (this.AudioElement && this.store) {
      this.AudioElement.autoplay = this.store.player.autoplay;
      this.AudioElement.src = this.store.player.source;
      this.setCurrentTime(this.store.player.currentTime);
      this.volume(this.store.player.volume);
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    this.AudioElement = this.props.audio;

    if (this.AudioElement && this.store) {
      this.AudioElement.autoplay = this.store.player.autoplay;
      this.AudioElement.src = this.store.player.source;
      this.setCurrentTime(this.store.player.currentTime);
      this.volume(this.store.player.volume);

      if (this.AudioElement && this.AudioElement.src !== "" && !this.AudioElement.error) {
        if (prevState.playable !== this.state.playable) {
          this.setState({ playable: true });
        }
      }
    }
  }

  setCurrentTime(time: number) {
    if (this.AudioElement && this.AudioElement.src !== "") {
      this.AudioElement.currentTime = time;
    }
  }

  togglePlayPause() {
    if (this.AudioElement) {
      if (this.AudioElement.paused) this.AudioElement.play();
      else this.AudioElement.pause();
    }
  }

  volume(value: number | null) {
    if (this.AudioElement) {
      if (typeof value === "number") {
        this.AudioElement.volume = value;
      }
    }
  }

  render() {
    return (
      <Grid container direction="row" bgcolor="#e1e1e1" height="75px" paddingX="20px" alignItems="center">
        <Grid item>
          <Controls />
        </Grid>
        <Grid item flex="1">
          <Track disabled={!this.state.playable} />
        </Grid>
        <Grid item>
          <Options />
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state: AppState) {
  const { state_player, state_playlist } = state;
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

export default connect(mapStateToProps)(CismuPlayerPlayer);
