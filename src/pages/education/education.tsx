import FormEducation from '@components/modules/education/form-education'
import HeaderEducation from '@components/modules/education/header-education'
import ContainerProtectedPage from '@components/ui/container/container-protected-page'

import { EducationContextProvider } from '@context/modules/education/education-context'

const Education = () => {
  return (
    <EducationContextProvider>
      <ContainerProtectedPage>
        <HeaderEducation />
      </ContainerProtectedPage>
      <FormEducation />
    </EducationContextProvider>
  )
}

export default Education
