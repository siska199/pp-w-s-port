import { TTypeFile } from '@typescript/ui-types'

export const basicToolbarConfig = {
  options: ['list', 'inline', 'colorPicker'],
  list: {
    options: ['unordered']
  },
  inline: {
    options: ['bold', 'underline', 'italic']
  }
}

export const defaultTTypeImage = [TTypeFile.JPEG, TTypeFile.JPG, TTypeFile.PNG]

export const navigationSliderClass = {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev'
}
