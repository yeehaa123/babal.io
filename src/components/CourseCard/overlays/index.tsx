import { OverlayModes } from "../types"
import SignInOverlay from "./SignInOverlay";
import CheckpointOverlay from "./CheckpointOverlay";
import EditOverlay from "./EditOverlay";
import MockOverlay from "./MockOverlay";
import NoteOverlay from "./NoteOverlay";
import CloneOverlay from "./CloneOverlay";

export type Overlay = {
  overlayMode: OverlayModes
  onCancel: () => void,
  onConfirm: (v: any) => void,

}


export {
  SignInOverlay, EditOverlay, CheckpointOverlay,
  MockOverlay, NoteOverlay, CloneOverlay
}
