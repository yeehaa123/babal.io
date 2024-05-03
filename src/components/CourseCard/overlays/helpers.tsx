import { OverlayModes } from "../types";
import type { Props } from "./index"

function determineOverlayState({ isAuthenticated, overlayMode, actions }: Props) {
  const { authenticate, signOut, hideCheckpoint } = actions;
  const title = overlayMode;
  const onCancel = isAuthenticated ? signOut : hideCheckpoint;
  const onConfirm = authenticate;
  const canConfirm = overlayMode === OverlayModes.AUTH;
  const formId = undefined;
  return { title, onCancel, onConfirm, canConfirm, formId }
}

export { determineOverlayState }
