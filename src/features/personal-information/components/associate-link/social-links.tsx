import FormSelectedSocialLink from '@features/personal-information/components/associate-link/form-selected-social-link'
import FormSocialLinks from '@features/personal-information/components/associate-link/form-social-links'
import Divider from '@components/ui/divider'

const SocialLinks = () => {
  return (
    <div className='space-y-3'>
      <h5>Social Links</h5>
      <FormSelectedSocialLink />
      <Divider />
      <FormSocialLinks />
    </div>
  )
}

export default SocialLinks
