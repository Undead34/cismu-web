import { ButtonGroup, Slider, IconButton, Stack, Button, Grid, Divider } from "@mui/material";
import { PlayArrow, Pause, SkipPrevious, SkipNext, VolumeMute } from "@mui/icons-material";
import { VolumeUp, Loop, Shuffle, Favorite } from "@mui/icons-material";
import styles from "../../../../styles/Home.module.css";
import { useState } from "react";

interface ControlsProps {
  togglePlayPause: () => Promise<boolean>;
  playable: boolean;
}

interface LikeProps {
  like?: boolean;
}

function Like({ like = false }: LikeProps) {
  const [Liked, setLiked] = useState(like);
  return (
    <IconButton onClick={() => setLiked(!Liked)}>
      <Favorite htmlColor={Liked ? "#3880ff" : "#0000008a"} />
    </IconButton>
  );
}

export function Controls(props: ControlsProps) {
  const [controlState, setControlState] = useState({ paused: true });
  let playPauseIcon;

  if (controlState.paused) {
    playPauseIcon = <PlayArrow />;
  } else {
    playPauseIcon = <Pause />;
  }

  return (
    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
      <IconButton disabled={!props.playable}>
        <SkipPrevious />
      </IconButton>
      <IconButton
        onClick={() => {
          if (props.playable) {
            props.togglePlayPause().then((value) => setControlState({ paused: value }));
          }
        }}
        disabled={!props.playable}
      >
        {playPauseIcon}
      </IconButton>
      <IconButton disabled={!props.playable}>
        <SkipNext />
      </IconButton>
    </ButtonGroup>
  );
}

function TimeSliderCounter(props: any) {
  let time = props?.time;
  return <div>{time ? time : "0:00"}</div>;
}

export function Track(props: any) {
  return (
    <Stack alignItems="center" spacing={2} direction="row">
      <TimeSliderCounter>0:00</TimeSliderCounter>
      <Slider size="small" disabled={props?.disabled}></Slider>
      <TimeSliderCounter>0:00</TimeSliderCounter>
    </Stack>
  );
}

function VolumeControl() {
  const [isHover, setIsHover] = useState(false);
  const [volume, setVolume] = useState(0.7);
  let volumeSlider;

  function mute(e: any) {
    if (e.target.localName !== "span") {
      if (volume > 0) {
        setVolume(0);
      } else {
        setVolume(0.7);
      }
    }
  }

  if (isHover) {
    volumeSlider = (
      <div className={styles.volumeControlSlider}>
        <Slider
          value={volume}
          min={0}
          max={1}
          step={0.01}
          orientation="vertical"
          size="small"
          onChange={(e, v) => setVolume(Number(v))}
        />
      </div>
    );
  }

  return (
    <IconButton
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={(e) => mute(e)}
    >
      {volumeSlider}
      {volume === 0 ? (
        <VolumeMute htmlColor={isHover ? "#3880ff" : "#0000008a"} />
      ) : (
        <VolumeUp htmlColor={isHover ? "#3880ff" : "#0000008a"} />
      )}
    </IconButton>
  );
}

export function Options() {
  return (
    <Grid container alignItems="center" direction="row" wrap="nowrap">
      <Grid item>
        <ButtonGroup>
          <Like />
          <IconButton>
            <Loop />
          </IconButton>
          <IconButton>
            <Shuffle />
          </IconButton>
          <VolumeControl />
        </ButtonGroup>
      </Grid>
      <Divider orientation="vertical" flexItem sx={{ mx: "5px" }} />
      <Grid item>
        <Button>Playlist</Button>
      </Grid>
    </Grid>
  );
}
