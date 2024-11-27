import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useEducationApi from '@features/education/apis/use-education-api'

const SectionEducationDetail = () => {
  const { id = '' } = useParams()
  const { getEducationDetail } = useEducationApi()
  const [education, setEducation] = useState({})

  useEffect(() => {
    handleInitData()
  }, [])

  const handleInitData = async () => {
    const result = await getEducationDetail(id)
    const data = result.data

    setEducation({
      ...data
    })
  }
  console.log('education: ', education)
  return <div>EducationDetail</div>
}

export default SectionEducationDetail
