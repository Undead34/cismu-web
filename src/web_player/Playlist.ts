import { store, AppState, AppDispatch } from "../store/store";
import { setItems, setItemsBackup, setSelect } from "../store/slice/playlist.state";
import { incrementCurrent, decrementCurrent, setCurrent } from "../store/slice/playlist.state";
import { setHasPrev, setHasNext, storeReset } from "../store/slice/playlist.state";

interface Music {
  id: number;
  title: string;
  artist: string;
  path: string;
  image?: string;
}

class Playlist {
  PlaylistState: AppState["state_playlist"];
  PlayerState: AppState["state_player"];
  dispatch: AppDispatch;

  constructor() {
    this.PlaylistState = store.getState()["state_playlist"];
    this.PlayerState = store.getState()["state_player"];
    this.dispatch = store.dispatch;
    store.subscribe(() => this.updateState());
  }

  updateState() {
    this.PlaylistState = store.getState().state_playlist;
  }

  _playlist_AddListener() {}
  _playlist_RemoveListener() {}
  _playlist_Create() {}
  _playlist_Modify() {}

  playlist_Delete() {
    this.dispatch(storeReset());
  }

  playlist_Load(items: Array<Music>) {
    this.dispatch(setItems(items));
    this.dispatch(setItemsBackup([]));
    this.dispatch(setSelect(null));
  }

  async playlist_Next() {
    await this.dispatch(incrementCurrent());

    if (this.PlaylistState.current >= this.PlaylistState.items.length) {
      await this.dispatch(setCurrent(this.PlaylistState.items.length - 1));
      await this.dispatch(setHasNext(false));
    } else await this.dispatch(setHasNext(true));
    await this.dispatch(setSelect(this.PlaylistState.items[this.PlaylistState.current]));
  }

  async playlist_Prev() {
    await this.dispatch(decrementCurrent());

    if (this.PlaylistState.current <= 0) {
      await this.dispatch(setCurrent(0));
      await this.dispatch(setHasPrev(false));
    } else await this.dispatch(setHasPrev(true));

    await this.dispatch(setSelect(this.PlaylistState.items[this.PlaylistState.current]));
  }

  async playlist_SetItem(index: number) {
    await this.dispatch(setCurrent(index));
    await this.dispatch(setSelect(this.PlaylistState.items[this.PlaylistState.current]));
  }

  playlist_Randrange(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  /* Fisher-Yates shuffle */
  playlist_Shuffle() {
    this.dispatch(setItemsBackup(this.PlaylistState.items.slice()));
    let items = this.PlaylistState.items.slice();

    for (let x = items.length - 1; x > 0; x--) {
      let az = this.playlist_Randrange(0, x - 1);

      let tmp = items[az];
      items[az] = items[x];
      items[x] = tmp;
    }
    this.dispatch(setItems(items));
    items = [];
  }
}

export default Playlist;
