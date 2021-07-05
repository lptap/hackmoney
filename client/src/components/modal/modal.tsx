import cn from 'classnames'
import { FC } from 'react'
import ReactModal from 'react-modal'
import { ModalMode } from 'shared/enums'
import './modal.css'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onAfterClose?: () => void
  mode?: ModalMode
  style?: ReactModal.Styles
  closeTimeoutMS?: number
  zIndexClassName?: string
  width?: string
  contentWrapperClassName?: string
  noContentPadding?: boolean
  overwriteClasses?: string[]
  shouldCloseOnOverlayClick?: boolean
}

export const MODAL_CLASSES = [
  'w-full',
  'max-w-xl',
  'bg-white',
  'focus:outline-none',
  'shadow',
  'md:h-auto',
  'rounded-lg',
  'md:rounded-4xl',
  'overflow-hidden',
]

export const OVERLAY_CLASSES = ['bg-black', 'bg-opacity-75', 'fixed', 'inset-0', 'flex', 'justify-center', 'transition']

export const MODAL_MODE_CLASSES: Record<ModalMode, { overlay: string; modal: string }> = {
  [ModalMode.REGULAR]: { overlay: 'items-center', modal: 'h-full' },
  [ModalMode.DROPDOWN]: {
    overlay: 'md:bg-transparent items-start md:items-center',
    modal: 'm-3 rounded-lg md:m-0 border md:absolute',
  },
  [ModalMode.BOTTOM_SHEET]: {
    overlay: 'items-end md:items-center',
    modal: 'm-3 rounded-lg md:m-0 border',
  },
}

export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  onAfterClose,
  mode = ModalMode.REGULAR,
  style,
  zIndexClassName = 'z-50',
  width = 'md:w-modal',
  closeTimeoutMS = 500,
  contentWrapperClassName,
  noContentPadding,
  overwriteClasses = [],
  shouldCloseOnOverlayClick = true,
}) => {
  return (
    <>
      <ReactModal
        ariaHideApp={false}
        style={style}
        className={cn(
          MODAL_CLASSES.filter((el) => !overwriteClasses.includes(el)),
          `duration-${closeTimeoutMS}`,
          MODAL_MODE_CLASSES[mode].modal,
          width,
        )}
        overlayClassName={cn(
          OVERLAY_CLASSES,
          `duration-${closeTimeoutMS}`,
          MODAL_MODE_CLASSES[mode].overlay,
          zIndexClassName,
        )}
        isOpen={isOpen}
        closeTimeoutMS={closeTimeoutMS}
        onRequestClose={onClose}
        onAfterClose={onAfterClose}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      >
        <div
          className={cn('h-full', contentWrapperClassName, {
            'pb-8 md:pb-10 px-8': !noContentPadding,
          })}
        >
          {children}
        </div>
      </ReactModal>
    </>
  )
}
