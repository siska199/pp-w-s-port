import FormSelectedSocialLink from '@features/personal-information/components/social-link/form-selected-social-link'
import FormSocialLinks from '@features/personal-information/components/social-link/form-social-links'
import Divider from '@components/ui/divider'

const SocialLinks = () => {
  return (
    <div className='space-y-3'>
      <h2 className='text-heading-05'>Social Links</h2>
      <FormSelectedSocialLink />
      <Divider />
      <FormSocialLinks />
    </div>
  )
}

export default SocialLinks
