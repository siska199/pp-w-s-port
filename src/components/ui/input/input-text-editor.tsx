import React, { useEffect, useState } from 'react'
import { ContentState, EditorState, RichUtils } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'

import ContainerInput from '@components/ui/input/container-input'

import { basicToolbarConfig } from '@lib/helper/constant'
import { isHtmlHasText } from '@lib/helper/function'
import { TBasePropsInput, TCustomeEventOnChange } from '@typescript/ui-types'

const LazyEditor = React.lazy(() =>
  import('react-draft-wysiwyg')?.then((module) => ({ default: module.Editor }))
)

interface TProps
  extends TBasePropsInput,
    Omit<React.ComponentProps<typeof LazyEditor>, 'onChange'> {
  value: string
  name: string
  onChange: (e: TCustomeEventOnChange<string>) => void
}

const InputTextEditor = (props: TProps) => {
  const {
    value,
    onChange,
    name,
    editorClassName,
    wrapperClassName,
    toolbar = basicToolbarConfig,
    ...attrs
  } = props

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    import('react-draft-wysiwyg/dist/react-draft-wysiwyg.css')

    if (value) {
      const initialState = getIntitialState(value)
      handleOnChangeEditorState(initialState)
    }
  }, [])

  const currentBlockType = RichUtils.getCurrentBlockType(editorState)

  const handleOnChangeEditorState = async (editorState: EditorState) => {
    setEditorState(editorState)
    const contentState = editorState.getCurrentContent()

    const draftJS = await import('draft-js')
    const rawContentState = draftJS.convertToRaw(contentState)

    const module = await import('draftjs-to-html')
    const draftJsToHTML = module.default
    const htmlContent = draftJsToHTML(rawContentState)
    const isEmptyValue = !isHtmlHasText(htmlContent)

    onChange({
      target: {
        name,
        value: isEmptyValue ? '' : htmlContent
      }
    })
  }

  const getIntitialState = (defaultValue: string) => {
    if (defaultValue) {
      const blocksFromHtml = htmlToDraft(defaultValue)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState?.createFromBlockArray(contentBlocks, entityMap)
      return EditorState.createWithContent(contentState)
    } else {
      return EditorState.createEmpty()
    }
  }

  return (
    <ContainerInput {...attrs} customeClass={{ ciV2: '!p-1 !overflow-visible' }}>
      <LazyEditor
        editorState={editorState}
        onEditorStateChange={handleOnChangeEditorState}
        editorClassName={`px-2 ${editorClassName}`}
        wrapperClassName={`min-h-[10rem] ${wrapperClassName}`}
        toolbar={toolbar}
        {...attrs}
        placeholder={!value && currentBlockType === 'unstyled' ? attrs?.placeholder : ''}
      />
    </ContainerInput>
  )
}

export default React.memo(InputTextEditor)
