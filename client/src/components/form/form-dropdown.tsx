import cn from 'classnames'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Button } from '../button'
import { Icon } from '../icon'

export type FormDropdownOpts = {
  label: string
  value: string
  icon: string
}

type FormDropdownProps<T = string> = {
  value: T | undefined | null
  onChange?: (value: T) => void
  options: FormDropdownOpts[]
  placeholder?: string
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideDropdown(ref: React.RefObject<HTMLDivElement> | undefined, callback: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref?.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}

export const FormDropdown: FC<FormDropdownProps> = ({ value, options, onChange, placeholder }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isExpand, setIsExpand] = useState<boolean>(false)
  const selectedOpt = options.find((opt) => opt.value === value)

  useOutsideDropdown(wrapperRef, () => setIsExpand(false))

  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value)
    }
    setIsExpand(false)
  }

  return (
    <div ref={wrapperRef} className="relative inline-block text-left w-48">
      <div>
        <Button
          type="button"
          className="flex flex-row justify-between items-center w-full px-5 h-12"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsExpand(true)}
        >
          {!!selectedOpt && selectedOpt.icon && <Icon name={selectedOpt.icon} className="h-6" />}
          <p className="text-xs font-bold leading-4">{!!selectedOpt ? selectedOpt.label : placeholder}</p>
          <Icon name="arrow-down" className="h-4" />
        </Button>
      </div>

      {isExpand && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none border-4 border-black px-3 py-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div role="none">
            {options.map((opt, idx) => (
              <div
                key={`opt_${opt.value}_${idx}`}
                className={cn('flex flex-row justify-between items-center cursor-pointer py-3', {
                  'border-b-2 border-black': idx !== options.length - 1,
                })}
                onClick={() => handleChange(opt.value)}
              >
                {opt.icon && <Icon name={opt.icon} className="h-6" />}
                <p className="text-black px-2 text-xs font-bold leading-4" role="menuitem" tabIndex={-1}>
                  {opt.label}
                </p>
                {opt.value === selectedOpt?.value ? (
                  <Icon name="cb-checked" className="h-6 mr-3" />
                ) : (
                  <Icon name="cb-uncheck" className="h-6 mr-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
