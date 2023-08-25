import React from 'react';
import { ErrorBoundary } from 'components/common/ErrorBoundary';
import { Editor } from 'components/editing/editor/Editor';
import { SwitchToMarkdownModal } from 'components/editing/editor/SwitchToMarkdownModal';
import { CommandDescription } from 'components/editing/elements/commands/interfaces';
import { MarkdownEditor } from 'components/editing/markdown_editor/MarkdownEditor';
import { useToggle } from 'components/hooks/useToggle';
import { ModelElement } from 'data/content/model/elements/types';
import { EditorType } from 'data/content/resource';
import { ProjectSlug, ResourceSlug } from 'data/types';
import { SwitchToSlateModal } from './markdown_editor/SwitchToSlateModal';
import { blockInsertOptions } from './toolbar/editorToolbar/blocks/blockInsertOptions';

type SlateOrMarkdownEditorProps = {
  allowBlockElements: boolean;
  editMode: boolean; // Whether or not we can edit
  content: ModelElement[]; // Content to edit
  onEdit: (content: ModelElement[]) => void; // Edit handler
  onEditorTypeChange: (editorType: EditorType) => void;
  projectSlug: ProjectSlug;
  placeholder?: string;
  resourceSlug?: ResourceSlug;
  initialHeight?: number;
  editorType?: EditorType;
  toolbarInsertDescs?: CommandDescription[]; // Content insertion options
};

/*
  This component:
    1. Handles displaying a slate or a markdown editor
    2. Handles confirmation dialogs for switching between the two
    3. Takes an initial value
    4. Bubbles up change events to the parent

*/

// The resource editor for content
export const SlateOrMarkdownEditor: React.FC<SlateOrMarkdownEditorProps> = ({
  editMode,
  projectSlug,
  resourceSlug,
  content,
  toolbarInsertDescs,
  onEdit,
  placeholder,
  onEditorTypeChange,
  editorType,
  initialHeight,
  allowBlockElements,
}) => {
  toolbarInsertDescs =
    toolbarInsertDescs ||
    blockInsertOptions({
      type: allowBlockElements ? 'extended' : 'inline',
    });

  const onContentEdit = React.useCallback(
    (children: ModelElement[]) => {
      onEdit(children);
    },
    [onEdit],
  );

  const [switchToMarkdownModal, toggleSwitchToMarkdownModal, , closeSwitchMarkdownModal] =
    useToggle();
  const [switchToSlateModal, toggleSwitchToSlateModal, , closeSwitchSlateModal] = useToggle();

  const changeEditor = (editor: 'markdown' | 'slate') => (_e?: any) => {
    console.info('Switching editor modes', editor);
    closeSwitchMarkdownModal();
    closeSwitchSlateModal();
    onEditorTypeChange(editor);
  };

  if (editorType === 'markdown') {
    return (
      <ErrorBoundary>
        <MarkdownEditor
          className="structured-content"
          commandContext={{ projectSlug: projectSlug, resourceSlug: resourceSlug }}
          editMode={editMode}
          value={content}
          initialHeight={initialHeight}
          onSwitchModes={toggleSwitchToSlateModal}
          onEdit={onContentEdit}
        />
        {switchToSlateModal && (
          <SwitchToSlateModal
            onCancel={toggleSwitchToSlateModal}
            onConfirm={changeEditor('slate')}
          />
        )}
      </ErrorBoundary>
    );
  } else {
    return (
      <ErrorBoundary>
        <Editor
          className="structured-content"
          commandContext={{ projectSlug: projectSlug, resourceSlug: resourceSlug }}
          editMode={editMode}
          value={content}
          placeholder={placeholder}
          onEdit={onContentEdit}
          toolbarInsertDescs={toolbarInsertDescs || []}
          onSwitchToMarkdown={toggleSwitchToMarkdownModal}
        />
        {switchToMarkdownModal && (
          <SwitchToMarkdownModal
            model={content}
            onCancel={toggleSwitchToMarkdownModal}
            onConfirm={changeEditor('markdown')}
          />
        )}
      </ErrorBoundary>
    );
  }
};

SlateOrMarkdownEditor.defaultProps = {
  allowBlockElements: true,
};
