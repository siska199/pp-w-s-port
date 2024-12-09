import React, { useMemo } from 'react'

import Badge from '@components/ui/badge'

import { TKeyVariantBadge } from '@lib/helper/variant/variant-badge'
import { IconDelete, IconEdit } from '@assets/icons'

interface TPropsCardAction extends React.HTMLProps<HTMLDivElement> {
  onDeleteData?: () => void
  onEditData?: () => void
  children: React.ReactNode
}
const CardAction = (props: TPropsCardAction) => {
  const { onEditData, onDeleteData, children } = props

  const listBtnAction = useMemo(
    () =>
      [
        {
          name: 'edit',
          variant: 'softborder-warning' as TKeyVariantBadge,
          label: <IconEdit className='icon-warning' />,
          onClick: onEditData,
          isShow: onEditData
        },
        {
          name: 'delete',
          variant: 'softborder-error' as TKeyVariantBadge,
          label: <IconDelete className='icon-error' />,
          onClick: onEditData,
          isShow: onEditData
        }
      ]?.filter((data) => data.isShow),
    [onDeleteData, onEditData]
  )
  return (
    <div className='border rounded-md p-4 w-full relative space-y-1 flex gap-2 '>
      <div>{children}</div>
      <div className='flex gap-2'>
        {listBtnAction?.map((btn, i) => (
          <Badge
            key={i}
            {...btn}
            shape={'pilled'}
            className={'!p-1 !min-h-auto !min-w-auto cursor-pointer-custome'}
          />
        ))}
      </div>
    </div>
  )
}

export default CardAction
