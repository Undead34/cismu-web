import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { Music } from "../../interfaces/Music";
import ListItem from "./ListItem";

interface Props {
  items: Array<Music>;
  select: Music | null;
  set_music: (index: number) => Promise<void>;
}

function CismuPlayerPlaylist(props: Props) {
  return (
    <div className="cismu-player playlist hide">
      <div className="playlist-header"></div>
      <div className="playlist-container">
        <div className="queuelist-cover">
          <div className="queuelist-cover-thumbnail">
            <div className="picture">
              <img
                src={
                  props.select?.image
                    ? props.select.image
                    : "https://m.media-amazon.com/images/I/51I5opSlr0L._UX250_FMjpg_QL85_.jpg"
                }
                alt="POPIPO"
              />
            </div>
          </div>
          <div className="queuelist-cover-actions">
            <div className="queuelist-container-title">
              <span className="queuelist-title">Lista de reproducción</span>
              <span className="queuelist-subtitle"> · {props.items.length} canciones · 07 min</span>
            </div>
            <div className="queuelist-cover-subtitle">
              <a className="queuelist-cover-link" href="#">
                {props.select?.artist}
              </a>
            </div>
          </div>
        </div>
        <div className="queuelist-content">
          <div className="queuelist-header">
            <div className="queuelist-header-inner">
              <div>#</div>
              <div>TÍTULO</div>
            </div>
          </div>
          <div className="queuelist-tracklist-inner">
            {props.items.map((item, index) => (
              <ListItem item={item} index={index} key={index + 1} set_music={props.set_music} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state: RootState) {
  const { state_playlist } = state;
  return {
    items: state_playlist.items,
    select: state_playlist.select,
  };
}

export default connect(mapStateToProps)(CismuPlayerPlaylist);
