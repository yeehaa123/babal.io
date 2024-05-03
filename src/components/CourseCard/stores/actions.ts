import { OverlayModes } from "../types";

type CoreActions = {
  login: () => Promise<void>,
  logout: () => Promise<void>,
  selectCheckpoint: (task: string) => void,
  unselectCheckpoint: () => void,
  setOverlayMode: (mode: OverlayModes) => void,
  hideOverlay: () => void,
}

export default function initialize({
  login,
  hideOverlay,
  selectCheckpoint,
  unselectCheckpoint,
  setOverlayMode,
  logout
}: CoreActions) {

  async function authenticate() {
    await login();
    hideOverlay();
  }

  function signIn() {
    setOverlayMode(OverlayModes.AUTH);
  }

  async function signOut() {
    await logout();
    hideOverlay();
  }

  function editCourse() {
    console.log("EDIT");
  }

  function addNotes() {
    console.log("NOTE");
  }

  function cloneCourse() {
    console.log("CLONE");
  }
  function toggleBookmark() {
    console.log
  }

  function toggleComplete() {
    console.log
  }

  function toggleMetaVisible() {
    console.log
  }

  function showCheckpoint(task: string) {
    selectCheckpoint(task);
    setOverlayMode(OverlayModes.CHECKPOINT);
  };

  function hideCheckpoint() {
    unselectCheckpoint();
    hideOverlay();
  };

  return {
    authenticate,
    signOut,
    signIn,
    editCourse,
    hideCheckpoint,
    hideOverlay,
    addNotes,
    cloneCourse,
    toggleBookmark,
    toggleComplete,
    toggleMetaVisible,
    showCheckpoint,
  }
}
