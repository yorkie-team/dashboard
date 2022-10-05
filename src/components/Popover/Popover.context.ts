import { createSafeContext } from 'utils';
import { POPOVER_ERRORS } from './Popover.errors';

type PopoverContext = {
  open: boolean;
  targetRef: React.RefObject<HTMLElement>;
  onToggle: () => void;
  onOpen: () => void;
  onClose?: () => void;
};

export const [PopoverContextProvider, usePopoverContext] = createSafeContext<PopoverContext>(POPOVER_ERRORS.context);