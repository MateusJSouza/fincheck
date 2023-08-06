import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../app/utils/cn';
import { ReactNode } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';

interface ModalProps {
  className?: string;
  open: boolean;
  children: ReactNode;
  title: string;
  rightAction?: ReactNode;
  onClose?(): void;
}

export function Modal({ className, open, title, onClose, rightAction, children }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 bg-black/80 z-50 backdrop-blur-sm',
            'data-[state=open]:animate-overlay-show',
            className
          )}
        />

        <Dialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0, 0, 0, 0.10)] w-full max-w-[400px] outline-none',
            'data-[state=open]:animate-content-show',
            className
          )}
        >
          <header
            className="h-12 flex items-center justify-between text-gray-800"
          >
            <button
              className="w-12 h-12 flex items-center justify-center outline-none"
              onClick={onClose}
            >
              <Cross2Icon className="w-6 h-6" />
            </button>

            <span
              className="text-lg font-bold tracking-[-1px]"
            >
              {title}
            </span>

            <div className="w-12 h-12 flex items-center justify-center">
              {rightAction}
            </div>
          </header>

          <div>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root >
  )
}
