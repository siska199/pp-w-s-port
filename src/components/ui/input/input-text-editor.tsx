import { useState } from 'react'
import { Editor, EditorProps } from 'react-draft-wysiwyg'
import { ContentState, convertToRaw, EditorState, RichUtils } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import ContainerInput from '@components/ui/input/container-input'

import { basicToolbarConfig } from '@lib/helper/constant'
import { isHtmlHasText } from '@lib/helper/function'
import { TBasePropsInput, TCustomeEventOnChange } from '@typescript/ui-types'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface TProps extends TBasePropsInput, Omit<EditorProps, 'onChange'> {
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
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(value))
  )
  const currentBlockType = RichUtils.getCurrentBlockType(editorState)

  const handleOnChangeEditorState = (editorState: EditorState) => {
    setEditorState(editorState)
    const contentState = editorState.getCurrentContent()
    const rawContentState = convertToRaw(contentState)

    const htmlContent = draftToHtml(rawContentState)
    const isEmptyValue = !isHtmlHasText(htmlContent)

    onChange({
      target: {
        name,
        value: isEmptyValue ? '' : htmlContent
      }
    })
  }

  return (
    <ContainerInput {...attrs} customeClass={{ ciV2: '!p-1 !overflow-visible' }}>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleOnChangeEditorState}
        editorClassName={`px-2 ${editorClassName}`}
        wrapperClassName={`min-h-[10rem] ${wrapperClassName}`}
        toolbar={toolbar}
        {...attrs}
        placeholder={!value && currentBlockType == 'unstyled' ? attrs?.placeholder : ''}
      />
    </ContainerInput>
  )
}

export default InputTextEditor
