export const hola = "";
// import { AppDispatch, RootState } from "../../../store/store";
// import { setItems } from "../../../store/slice/PlaylistSlice";
// import { Music } from "../../../interfaces/Music";
// import { connect } from "react-redux";
// import React from "react";

// import IconButton from '@mui/material/IconButton';
// import PlayArrow from '@mui/icons-material/PlayArrow';

// interface ListPorps {
//   item: Music;
//   items: Array<Music>;
//   index: number;
//   dispatch: AppDispatch;
//   select: Music | null;
//   set_music: (index: number) => Promise<void>;
// }

// type DragEventType = React.DragEvent<HTMLDivElement>;

// class ListItem extends React.Component<ListPorps> {
//   element: React.RefObject<HTMLDivElement>;
//   state: {
//     isHover: boolean;
//   };
//   constructor(props: ListPorps) {
//     super(props);
//     this.element = React.createRef();
//     this.state = {
//       isHover: false
//     };
//   }

//   // Start and end drag
//   handleDragStart(e: DragEventType) {
//     let id = this.element.current?.getAttribute("data-index");
//     e.dataTransfer.setData("text/html", String(id));
//   }

//   handleDragEnd(e: DragEventType) {}

//   // Drag tracking
//   handleDragOver(e: DragEventType) {
//     e.preventDefault();
//     let coords = this.element.current?.getBoundingClientRect() || { height: 0 };
//     if (e.nativeEvent.offsetY <= coords.height / 2) {
//       this.element.current?.classList.remove("enter-bottom");
//       this.element.current?.classList.add("enter-top");
//     } else {
//       this.element.current?.classList.remove("enter-top");
//       this.element.current?.classList.add("enter-bottom");
//     }
//   }

//   handleDrag(e: DragEventType) {
//     e.preventDefault();
//   }

//   // Position tracking
//   handleDragLeave(e: DragEventType) {
//     e.preventDefault();
//     this.element.current?.classList.remove("enter-bottom");
//     this.element.current?.classList.remove("enter-top");
//   }

//   handleEnter(e: DragEventType) {
//     e.preventDefault();
//   }

//   // The awesome drop
//   handleDrop(e: DragEventType) {
//     let droppedIndex = Number(e.dataTransfer.getData("text/html"));
//     let draggedIndex = Number(this.element.current?.getAttribute("data-index"));

//     // let dropped = document.querySelector(`div[data-index="${droppedIndex}"]`);
//     // let dragged = this.element.current;

//     let items = this.props.items.slice();
//     items[droppedIndex] = this.props.items[draggedIndex];
//     items[draggedIndex] = this.props.items[droppedIndex];
//     this.props.dispatch(setItems(items));

//     this.element.current?.classList.remove("enter-bottom");
//     this.element.current?.classList.remove("enter-top");
//   }

//   handleMouseOver(e: any) {
//     e.preventDefault();
//     this.element.current?.classList.add("hover");
//     this.setState({
//       isHover: true
//     });
//   }

//   handleMouseLeave(e: any) {
//     e.preventDefault();
//     this.element.current?.classList.remove("hover");
//     this.setState({
//       isHover: false
//     });
//   }

//   render() {
//     let { index, item } = this.props;
//     let itemProps = {
//       style: { top: 56 * index + "px" },
//       ref: this.element,
//       className:
//         this.props.select?.id === item.id ? "list-item active" : "list-item",
//       onDragStart: (e: DragEventType) => this.handleDragStart(e),
//       onDragEnd: (e: DragEventType) => this.handleDragEnd(e),
//       onDragOver: (e: DragEventType) => this.handleDragOver(e),
//       onDrag: (e: DragEventType) => this.handleDrag(e),
//       onDragLeave: (e: DragEventType) => this.handleDragLeave(e),
//       onDragEnter: (e: DragEventType) => this.handleEnter(e),
//       onDrop: (e: DragEventType) => this.handleDrop(e),
//       onMouseOver: (e: any) => this.handleMouseOver(e),
//       onMouseLeave: (e: any) => this.handleMouseLeave(e)
//     };

//     return (
//       <div draggable="true" data-index={index} {...itemProps}>
//         <div>
//           <div>
//             {this.state.isHover ? (

//               <IconButton aria-label="delete" onClick={() => this.props.set_music(index)}>
//                <PlayArrow />
//               </IconButton>
//             ) : (
//               <i>{index + 1}</i>
//             )}
//           </div>
//           <div>
//             <i>{item.title}</i>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state: RootState) {
//   const { state_playlist } = state;
//   return {
//     items: state_playlist.items,
//     select: state_playlist.select
//   };
// }

// export default connect(mapStateToProps)(ListItem);
