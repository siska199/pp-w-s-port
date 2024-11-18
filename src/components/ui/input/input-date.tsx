import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import DatePicker, { DatePickerProps, ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import clsx from 'clsx'
import { format } from 'date-fns'

import Button from '@components/ui/button'
import ContainerInput from '@components/ui/input/container-input'

import { cn } from '@lib/helper/function'
import { TBasePropsInput, TCustomeEventOnChange } from '@typescript/ui-types'
import { IconCalender, IconChevronLeft, IconChevronRight } from '@assets/icons'

type TValueDate = [Date | null, Date | null] | Date | null

interface TProps
  extends TBasePropsInput,
    Omit<DatePickerProps, 'onChange' | 'value' | 'minDate' | 'maxDate'> {
  name: string
  value: TValueDate
  minDate?: Date | null
  maxDate?: Date | null
  onChange: (e: TCustomeEventOnChange<TValueDate>) => void
  placeholder?: string
  iconPosition?: 'start' | 'end'
}

const InputDate = (props: TProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    name,
    value,
    iconPosition = 'start',
    placeholder,
    onChange,
    maxDate,
    minDate,
    ...attrs
  } = props

  const [showTypeDate, setShowTypeDate] = useState<'date' | 'month' | 'year' | ''>('')
  const [isShouldCloseOnSelect, setIsShouldCloseOnSelect] = useState(true)

  useEffect(() => {
    import('@assets/styles/input/input-date.css')
  }, [])

  const handleOnChange = (valueDate: TValueDate) => {
    setTimeout(() => {
      onChange({
        target: {
          name,
          value: valueDate
        }
      })
    }, 50)
    setShowTypeDate('')
    setIsShouldCloseOnSelect(true)
  }

  const handleShowMonth = () => {
    setShowTypeDate('month')
    setIsShouldCloseOnSelect(false)
  }

  const handleShowYear = () => {
    setShowTypeDate('year')
    setIsShouldCloseOnSelect(false)
  }

  const handleOnCalenderClose = () => {
    setShowTypeDate('')
  }

  const date = useCallback(
    (index: number = 0) =>
      Array.isArray(value) ? (value[index] ?? undefined) : (value ?? undefined),
    [value]
  )

  const memoizedMinDate = useMemo(() => {
    return minDate ?? undefined
  }, [minDate])
  const memoizedMaxDate = useMemo(() => {
    return maxDate ?? undefined
  }, [maxDate])

  return (
    <ContainerInput
      {...attrs}
      value={value}
      customeClass={{
        ...attrs.customeClass,
        ciV2: `${showTypeDate ? '!border-primary ' : 'focus-within:!border-gray-200 focus-within:!ring-gray-200 '} ${attrs?.customeClass?.ciV2}`
      }}
    >
      {() => (
        <DatePicker
          customInput={<CustomeInput ref={inputRef} />}
          onCalendarClose={handleOnCalenderClose}
          selected={date(0)}
          startDate={date(0)}
          endDate={date(1)}
          minDate={memoizedMinDate}
          maxDate={memoizedMaxDate}
          onChange={handleOnChange}
          nextMonthButtonLabel='>'
          previousMonthButtonLabel='<'
          showPreviousMonths={true}
          placeholderText={placeholder}
          showYearPicker={showTypeDate === 'year'}
          showMonthYearPicker={showTypeDate === 'month'}
          showFullMonthYearPicker={showTypeDate === 'date'}
          renderCustomHeader={(propsCustomeHeader) => (
            <HeaderDateCustome
              showTypeDate={showTypeDate}
              handleShowMonth={handleShowMonth}
              handleShowYear={handleShowYear}
              {...propsCustomeHeader}
            />
          )}
          onCalendarOpen={() => setShowTypeDate('date')}
          shouldCloseOnSelect={isShouldCloseOnSelect}
          enableTabLoop={true}
          yearItemNumber={8}
          showIcon={true}
          icon={<IconCalender />}
          disabled={attrs.disabled}
          isClearable={!!value}
          toggleCalendarOnIconClick={true}
          popperClassName='flex flex-col gap-2 z-[10] justify-enter react-datepicker-left !shadow-none overflow-hidden'
          wrapperClassName='w-full'
          className={clsx({
            '': true,
            'ml-6': iconPosition === 'start',
            'mr-6': iconPosition === 'end'
          })}
          calendarClassName={'border relative'}
          calendarIconClassName={cn({
            'absolute mt-[-0.25rem] z-[2]': true,
            'left-[-0.5rem]': iconPosition === 'start',
            'right-[-0.5rem]': iconPosition === 'end'
          })}
          clearButtonClassName={clsx({
            'right-[-0.25rem] z-[10]': true,
            'right-[0.65rem]': iconPosition === 'end'
          })}
          onKeyDown={(e) => {
            e.preventDefault()
          }}
        />
      )}
    </ContainerInput>
  )
}

interface TPropsHeaderDateCustome extends ReactDatePickerCustomHeaderProps {
  showTypeDate: 'date' | 'month' | 'year' | ''
  handleShowYear: () => void
  handleShowMonth: () => void
}

const HeaderDateCustome = (props: TPropsHeaderDateCustome) => {
  const { date, showTypeDate, handleShowMonth, handleShowYear, ...attrsHeader } = props
  return (
    <div className='flex items-center rounded-[16px] justify-between px-2'>
      <BtnIconPrevNext type={'next'} showTypeDate={showTypeDate} {...attrsHeader} date={date} />
      <div className='text-body-medium font-semibold flex gap-2 text-gray-700'>
        {['date', ''].includes(showTypeDate) && (
          <span onClick={handleShowMonth} className='cursor-pointer'>
            {format(date || '', 'MMMM')}
          </span>
        )}

        <span
          onClick={showTypeDate === 'year' ? () => null : handleShowYear}
          className={showTypeDate === 'year' ? '' : 'cursor-pointer'}
        >
          {format(date || '', 'yyyy')}
        </span>
      </div>
      <BtnIconPrevNext type={'prev'} showTypeDate={showTypeDate} {...attrsHeader} date={date} />
    </div>
  )
}

interface TPropsBtnIconPrevNext extends ReactDatePickerCustomHeaderProps {
  type: 'prev' | 'next'
  showTypeDate: 'date' | 'month' | 'year' | ''
}

const BtnIconPrevNext = (props: TPropsBtnIconPrevNext) => {
  const {
    type,
    decreaseMonth,
    decreaseYear,
    showTypeDate,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    increaseYear,
    increaseMonth
  } = props
  const isNext = type === 'next'

  const handleOnClik = (e: React.MouseEvent<HTMLButtonElement | HTMLLinkElement, MouseEvent>) => {
    e.preventDefault()
    return ['year', 'month']?.includes(showTypeDate)
      ? isNext
        ? increaseYear()
        : decreaseYear()
      : isNext
        ? increaseMonth()
        : decreaseMonth()
  }
  return (
    <Button
      onClick={handleOnClik}
      disabled={isNext ? nextMonthButtonDisabled : prevMonthButtonDisabled}
      shape={'circle'}
      variant={'solid-white'}
      className={clsx({
        'p-2': true,
        'cursor-not-allowed opacity-50 ': isNext ? nextMonthButtonDisabled : prevMonthButtonDisabled
      })}
    >
      {isNext ? <IconChevronLeft /> : <IconChevronRight />}
    </Button>
  )
}

const CustomeInput = forwardRef<HTMLInputElement, any>((props, ref) => {
  return <input {...props} ref={ref} readOnly />
})

export default React.memo(InputDate)
