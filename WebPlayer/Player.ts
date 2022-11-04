import { setCurrentTime, setDuration, setVolume } from "../store/slice/player.state";
import Playlist from "./Playlist";

interface Music {
  id: number;
  title: string;
  artist: string;
  path: string;
  image?: string;
}

class Player extends Playlist {
  AudioElement: HTMLAudioElement;

  constructor() {
    super();
    this.AudioElement = document.createElement("audio");
    this.AudioElement.autoplay = !0;
    this.addEventListeners();
  }

  pause() {
    if (this.AudioElement.src !== "" || this.AudioElement.src === null) this.AudioElement.pause();
  }

  play() {
    if (this.AudioElement.src !== "" || this.AudioElement.src === null) this.AudioElement.play();
  }

  stop() {
    this.pause();
    this.AudioElement.src = "";
  }

  async next() {
    await this.playlist_Next();
    this.load();
  }

  async prev() {
    await this.playlist_Prev();
    this.load();
  }

  async set_music(index: number) {
    await this.playlist_SetItem(index);
    this.load();
  }

  load_playlist(val: Array<Music>) {
    this.playlist_Load(val);
  }

  loadByURL(url: string) {
    this.AudioElement.src = url;
    this.AudioElement.load();
  }

  load() {
    this.AudioElement.src = this.PlaylistState.select ? this.PlaylistState.select.path : "";
    this.AudioElement.load();
  }

  get muted() {
    return this.AudioElement.muted;
  }

  set muted(val) {
    this.AudioElement.muted = Boolean(val);
  }

  get volume() {
    return this.AudioElement.volume;
  }

  set volume(val) {
    this.AudioElement.volume = val;
  }

  get currentTime() {
    return this.AudioElement.currentTime;
  }

  set currentTime(val: number) {
    if (Number.isFinite(val) && !Number.isNaN(val)) {
      this.AudioElement.currentTime = val;
    }
  }

  get duration() {
    return this.AudioElement.duration;
  }

  async destroy() {
    await this.playlist_Delete();
    await this.load();
  }

  addEventListeners() {
    this.AudioElement.addEventListener("ended", () => this.next());
    this.AudioElement.addEventListener("timeupdate", () =>
      this.dispatch(setCurrentTime(this.AudioElement.currentTime))
    );

    this.AudioElement.addEventListener("volumechange", () =>
      this.dispatch(setVolume(this.AudioElement.volume))
    );

    this.AudioElement.addEventListener("loadedmetadata", () => {
      this.dispatch(setCurrentTime(this.AudioElement.currentTime));
      this.dispatch(setDuration(this.AudioElement.duration));
    });
  }

  removeEventListeners() {
    this.AudioElement.removeEventListener("ended", (e) => {});
  }
}

export default Player;
