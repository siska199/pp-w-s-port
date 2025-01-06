import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useEducationApi from '@features/education/apis/use-education-api'
import { TEducation } from '@features/education/types/education-type'
import DisplayFile from '@components/ui/display/display-file'
import DisplayInfo, { TTypeDispalyInformation } from '@components/ui/display/display-info'

import useFile from '@hooks/use-file'
import { formatDate } from '@lib/helper/function'
import { TFileWithPreview } from '@typescript/index-type'

type TPickEducation = Pick<
  TEducation<TFileWithPreview | null>,
  | 'gpa'
  | 'description'
  | 'level_name'
  | 'major_name'
  | 'school_name'
  | 'start_at'
  | 'end_at'
  | 'school_image'
>

type TEducationData = {
  [Key in keyof TPickEducation]: {
    label: string
    value: TPickEducation[Key]
  }
}

const SectionEducationDetail = () => {
  const { id = '' } = useParams()
  const { getEducationDetail } = useEducationApi()
  const [educationData, setEducationData] = useState<TEducationData>({
    level_name: {
      label: 'Level',
      value: ''
    },
    school_name: {
      label: 'School',
      value: ''
    },
    major_name: {
      label: 'Major',
      value: ''
    },
    gpa: {
      label: 'GPA',
      value: 0
    },
    start_at: {
      label: 'Start At',
      value: ''
    },
    end_at: {
      label: 'End At',
      value: ''
    },
    description: {
      label: 'Description',
      value: ''
    },
    school_image: {
      label: 'Logo',
      value: null
    }
  })
  const { handleGetFileFromUrl } = useFile()

  useEffect(() => {
    handleInitData()
  }, [])

  const handleInitData = async () => {
    const result = await getEducationDetail(id)
    const education = result.data
    if (education) {
      educationData['gpa'].value = education?.gpa
      educationData['school_name'].value = education?.school_name
      educationData['level_name'].value = education?.level_name
      educationData['major_name'].value = education?.level_name
      educationData['gpa'].value = education?.gpa
      educationData['description'].value = education?.description
      educationData['start_at'].value = formatDate({ date: education?.start_at })
      educationData['end_at'].value = formatDate({ date: education?.end_at })
      educationData['school_image'].value = await handleGetFileFromUrl({
        url: education?.school_image as string,
        filename: 'professional-image'
      })
      setEducationData({
        ...educationData
      })
    }
  }

  return (
    <div className='w-full h-full flex flex-col gap-8'>
      <div className='md-w-[80%] space-y-4'>
        <DisplayFile
          file={educationData?.school_image?.value}
          className={{
            containerImage: '!border-none mx-auto'
          }}
        />
        <div className='grid grid-cols-1 md:grid-cols-3  gap-4'>
          {Object.keys(educationData)
            .filter((key, _) => key !== 'school_image')
            ?.map((key) => {
              const keyField = key as keyof typeof educationData
              let type = TTypeDispalyInformation.TEXT

              switch (keyField) {
                case 'description':
                  type = TTypeDispalyInformation.HTML
                  break
              }
              return (
                <DisplayInfo
                  label={educationData[keyField].label}
                  value={String(educationData[keyField].value)}
                  type={type}
                  withBorder={true}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default SectionEducationDetail
