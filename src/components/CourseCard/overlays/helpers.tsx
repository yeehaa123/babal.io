import { OverlayModes } from ".";
import type { StoreState } from "../stores"

function determineOverlayState({ state, actions }: StoreState) {
  const { overlayMode, isAuthenticated } = state;
  const { authenticate, signOut, hideCheckpoint } = actions;
  const title = overlayMode!;
  const onCancel = isAuthenticated ? signOut : hideCheckpoint;
  const onConfirm = authenticate;
  const canConfirm = overlayMode === OverlayModes.AUTH;
  const formId = undefined;
  return { title, onCancel, onConfirm, canConfirm, formId }
}

export { determineOverlayState }
