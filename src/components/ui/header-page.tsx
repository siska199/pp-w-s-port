import { useNavigate } from 'react-router-dom'
import { IconArrowUp } from '@assets/icons'
import Button from '@components/ui/button'

interface TProps {
  title: string
  onClickAddData?: () => void
  isNested?: boolean
}

const HeaderPage = (props: TProps) => {
  const { title, isNested, onClickAddData } = props
  const navigate = useNavigate()

  const handleBackBtn = () => {
    navigate(-1)
  }

  return (
    <div className='border-b flex gap-4 items-center pb-8 '>
      <div className='flex items-center gap-2'>
        {isNested && (
          <IconArrowUp
            onClick={handleBackBtn}
            className='-rotate-90 cursor-pointer'
            style={{ width: '2rem', height: '2rem' }}
          />
        )}
        <h2 className='font-bold text-heading-04'>{title}</h2>
      </div>
      {onClickAddData && (
        <Button
          variant={'soft-primary'}
          onClick={onClickAddData}
          className='!p-2 mt-1 !min-w-8 h-8'
        >
          <span className='text-body-large font-medium -mt-1'>+</span>
        </Button>
      )}
    </div>
  )
}

export default HeaderPage
