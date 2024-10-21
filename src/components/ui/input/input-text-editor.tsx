import ContainerInput from '@components/ui/input/container-input';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import { Editor, EditorProps } from 'react-draft-wysiwyg';
import { TBasePropsInput, TCustomeEventOnChange } from 'types/ui-types';

import { useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

interface TProps extends TBasePropsInput, Omit<EditorProps, 'onChange'> {
  value: string;
  name: string;
  onChange: (e: TCustomeEventOnChange<string>) => void;
}

const InputTextEditor = (props: TProps) => {
  const { value, onChange, name, editorClassName, wrapperClassName, ...attrs } =
    props;
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(value))
  );

  const handleOnChangeEditorState = (editorState: EditorState) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);

    const htmlContent = draftToHtml(rawContentState);
    const isMmptyValue = htmlContent.trim() === '<p></p>' || !htmlContent;

    onChange({
      target: {
        name,
        value: isMmptyValue ? '' : htmlContent,
      },
    });
  };

  return (
    <ContainerInput
      {...attrs}
      customeClass={{ ciV2: '!p-0 !overflow-visible' }}
    >
      <Editor
        editorState={editorState}
        onEditorStateChange={handleOnChangeEditorState}
        toolbar={[['fontsize', ['fontsize']]]}
        editorClassName={`h-[5rem] px-2 ${editorClassName}`}
        wrapperClassName={`h-auto  ${wrapperClassName}`}
        {...attrs}
      />
    </ContainerInput>
  );
};

export default InputTextEditor;
