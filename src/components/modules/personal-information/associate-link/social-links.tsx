import FormAddSocialLink from '@components/modules/personal-information/associate-link/form-add-social-link'
import FormSocialLinks from '@components/modules/personal-information/associate-link/form-social-links'
import Divider from '@components/ui/divider'
import { SocialLinkContextProvider } from '@context/modules/personal-info/social-link-context'

const SocialLinks = () => {
  return (
    <SocialLinkContextProvider>
      <div className='space-y-3'>
        <h5>Social Links</h5>
        <FormAddSocialLink />
        <Divider />
        <FormSocialLinks />
      </div>
    </SocialLinkContextProvider>
  )
}

export default SocialLinks
