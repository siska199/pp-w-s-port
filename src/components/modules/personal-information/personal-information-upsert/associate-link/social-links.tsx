import FormAddSocialLink from '@components/modules/personal-information/personal-information-upsert/associate-link/form-selected-social-link'
import FormSocialLinks from '@components/modules/personal-information/personal-information-upsert/associate-link/form-social-links'
import Divider from '@components/ui/divider'

const SocialLinks = () => {
  return (
    <div className='space-y-3'>
      <h5>Social Links</h5>
      <FormAddSocialLink />
      <Divider />
      <FormSocialLinks />
    </div>
  )
}

export default SocialLinks
