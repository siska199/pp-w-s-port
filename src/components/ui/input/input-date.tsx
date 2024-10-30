import { forwardRef, useCallback, useRef, useState } from 'react'
import DatePicker, { DatePickerProps } from 'react-datepicker'
import clsx from 'clsx'
import { format } from 'date-fns'

import Button from '@components/ui/button'
import ContainerInput from '@components/ui/input/container-input'

import { cn } from '@lib/helper/function'
import { TBasePropsInput, TCustomeEventOnChange } from '@typescript/modules/ui/ui-types'
import { IconCalender, IconChevronLeft, IconChevronRight } from '@assets/icons'

import 'react-datepicker/dist/react-datepicker.css'

type TValueDate = [Date | null, Date | null] | Date | null

interface TProps extends TBasePropsInput, Omit<DatePickerProps, 'onChange' | 'value'> {
  name: string
  value: TValueDate
  onChange: (e: TCustomeEventOnChange<TValueDate>) => void
  placeholder?: string
  iconPosition?: 'start' | 'end'
}

const InputDate = (props: TProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { name, value, iconPosition = 'start', placeholder, onChange, ...attrs } = props

  const [showTypeDate, setShowTypeDate] = useState<'date' | 'month' | 'year' | ''>('')
  const [isShouldCloseOnSelect, setIsShouldCloseOnSelect] = useState(true)
  

  const handleOnChange = (valueDate: TValueDate) => {
    setTimeout(()=>{
      onChange({
        target: {
          name,
          value: valueDate
        }
      })
      inputRef.current?.blur()

    }, 50)
    setShowTypeDate(showTypeDate === 'date' ? '' : 'date')
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
  return (
    <ContainerInput {...attrs} value={value}
    
      customeClass={{
        ...attrs.customeClass,
        ciV2 : `${showTypeDate? '!border-primary ': 'focus-within:!border-gray-200 focus-within:!ring-gray-200 '} ${attrs?.customeClass?.ciV2}`
      }}
    >
      {() => (
        <DatePicker
          customInput={<CustomeInput ref={inputRef}/>}
          onCalendarClose={handleOnCalenderClose}
          selected={date(0)}
          startDate={date(0)}
          endDate={date(1)}
          onChange={handleOnChange}
          nextMonthButtonLabel='>'
          previousMonthButtonLabel='<'
          showPreviousMonths={true}
          placeholderText={placeholder}
          showYearPicker={showTypeDate === 'year'}
          showMonthYearPicker={showTypeDate === 'month'}
          showFullMonthYearPicker={showTypeDate === 'date'}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            decreaseYear,
            increaseYear,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled
          }) => (
            <div className='flex items-center rounded-[16px] justify-between px-2'>
              <Button
                onClick={
                  (e) => {
                  e.preventDefault()
                  return ['year', 'month']?.includes(showTypeDate)
                    ? decreaseYear()
                    : decreaseMonth()
                }}
                disabled={prevMonthButtonDisabled}
                shape={'circle'}
                variant={'solid-white'}
                className={clsx({
                  'p-2': true,
                  'cursor-not-allowed opacity-50 ': prevMonthButtonDisabled
                })}
              >
                <IconChevronLeft />
              </Button>

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
              <Button
                shape={'circle'}
                variant={'solid-white'}
                onClick={(e) => {
                  e.preventDefault()
                  return ['year', 'month']?.includes(showTypeDate)
                    ? increaseYear()
                    : increaseMonth()
                }}
                disabled={nextMonthButtonDisabled}
                className={clsx({
                  'p-2': true,
                  'cursor-not-allowed opacity-50': nextMonthButtonDisabled
                })}
              >
                <IconChevronRight />
              </Button>
            </div>
          )}
          onCalendarOpen={()=>setShowTypeDate('date')}
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
            e.preventDefault();
         }}
         
        />
      )}
    </ContainerInput>
  )
}

const CustomeInput = forwardRef<HTMLInputElement, any>((props, ref)=>{
  return <input
    {...props}
    ref={ref}
    readOnly
  />
})

export default InputDate

