import cn from 'classnames'
import { FC } from 'react'
import { Icon } from '../icon'
import { useSnackbar } from 'shared/hooks'
import { SnackbarPosition, SnackbarVariant } from 'shared/enums'

type SnackbarProps = {
  timeout?: number
  position?: SnackbarPosition
}

const classes = ['text-base', 'text-center', 'leading-6', 'ml-4']

const snackbarAttrs = {
  [SnackbarVariant.INFO]: {
    bgColor: 'bg-info-200',
    textColor: 'text-info-500',
    icon: 'notify-info',
  },
  [SnackbarVariant.SUCCESS]: {
    bgColor: 'bg-success-200',
    textColor: 'text-success-500',
    icon: 'notify-success',
  },
  [SnackbarVariant.WARNING]: {
    bgColor: 'bg-warn-200',
    textColor: 'text-warn-500',
    icon: 'notify-warn',
  },
  [SnackbarVariant.ERROR]: {
    bgColor: 'bg-error-200',
    textColor: 'text-error-500',
    icon: 'notify-error',
  },
}

const snackbarPositions = {
  [SnackbarPosition.TOP_LEFT]: ['top-4', 'left-4', 'snackbar-top-anim'],
  [SnackbarPosition.TOP_RIGHT]: ['top-4', 'right-4', 'snackbar-top-anim'],
  [SnackbarPosition.TOP_CENTER]: ['top-4', 'left-1/2', 'transform', '-translate-x-1/2', 'snackbar-top-anim'],
  [SnackbarPosition.BOTTOM_LEFT]: ['bottom-4', 'left-4', 'snackbar-bot-anim'],
  [SnackbarPosition.BOTTOM_RIGHT]: ['bottom-4', 'right-4', 'snackbar-bot-anim'],
  [SnackbarPosition.BOTTOM_CENTER]: ['bottom-4', 'left-1/2', 'transform', '-translate-x-1/2', 'snackbar-bot-anim'],
}

export const Snackbar: FC<SnackbarProps> = ({ timeout = 3000, position = SnackbarPosition.TOP_CENTER }) => {
  const snackbar = useSnackbar()

  const handleTimeout = () => {
    setTimeout(() => {
      snackbar.close()
    }, timeout)
  }

  if (snackbar.isOpen) {
    handleTimeout()
  }

  return (
    <>
      {snackbar.isOpen && (
        <>
          <div
            className={cn(
              'flex justify-between items-start fixed z-10 p-4 rounded border transition-all duration-500',
              snackbarAttrs[snackbar.variant].bgColor,
              snackbarPositions[position],
            )}
          >
            <Icon name={snackbarAttrs[snackbar.variant].icon} className="w-6 h-6" />
            <p className={cn(classes, snackbarAttrs[snackbar.variant].textColor)}>{snackbar.message}</p>
          </div>
        </>
      )}
    </>
  )
}
