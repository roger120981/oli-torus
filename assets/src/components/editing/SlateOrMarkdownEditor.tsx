import React, { ErrorInfo, useMemo } from 'react';
import { Button } from 'components/common/Buttons';
import { ErrorBoundary, ErrorMessage } from 'components/common/ErrorBoundary';
import { Editor } from 'components/editing/editor/Editor';
import { SwitchToMarkdownModal } from 'components/editing/editor/SwitchToMarkdownModal';
import { CommandDescription } from 'components/editing/elements/commands/interfaces';
import { MarkdownEditor } from 'components/editing/markdown_editor/MarkdownEditor';
import { useToggle } from 'components/hooks/useToggle';
import { ModelElement, TextDirection } from 'data/content/model/elements/types';
import { EditorType } from 'data/content/resource';
import { ProjectSlug, ResourceSlug } from 'data/types';
import { SwitchToSlateModal } from './markdown_editor/SwitchToSlateModal';
import { blockInsertOptions } from './toolbar/editorToolbar/blocks/blockInsertOptions';

type SlateOrMarkdownEditorProps = {
  allowBlockElements: boolean;
  editMode: boolean; // Whether or not we can edit
  content: ModelElement[]; // Content to edit
  onEdit: (content: ModelElement[]) => void; // Edit handler
  onEditorTypeChange?: (editorType: EditorType) => void;
  editorType: EditorType;
  projectSlug: ProjectSlug;
  placeholder?: string;
  resourceSlug?: ResourceSlug;
  toolbarInsertDescs?: CommandDescription[]; // Content insertion options
  style?: React.CSSProperties;
  className?: string;
  textDirection?: TextDirection;
  onChangeTextDirection?: (textDirection: TextDirection) => void;
};

interface ErrorBoundaryState {
  error?: Error;
  errorInfo?: ErrorInfo;

  content: ModelElement[];
  contentHistory: ModelElement[][];
}
export class SlateOrMarkdownEditor extends React.Component<
  SlateOrMarkdownEditorProps,
  ErrorBoundaryState
> {
  constructor(props: Readonly<SlateOrMarkdownEditorProps>) {
    super(props);
    this.state = { contentHistory: [props.content], content: props.content };
  }

  onEdit = (content: ModelElement[]) => {
    this.props.onEdit(content);

    console.info(this.props.content);

    this.setState((state) => {
      // Maintain a stack of previous content, but limit it to 25 old revisions.
      const newHistory = [...state.contentHistory, content];
      console.info('newHistory', newHistory);

      if (newHistory.length > 25) {
        newHistory.shift();
      }

      return { contentHistory: newHistory };
    });
  };

  revert = () => {
    this.setState((state) => {
      const newHistory = [...state.contentHistory];
      newHistory.pop(); // The breaking change
      const previousContent = newHistory.pop() || []; // The previous content before the breaking change
      console.info('reverting to', previousContent);
      this.props.onEdit(previousContent);

      return { contentHistory: newHistory, error: undefined, content: previousContent };
    });
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { error, errorInfo } = this.state;

    if (error) {
      return (
        <ErrorMessage
          errorMessage={error?.message || 'Fatal error in editor'}
          error={error}
          info={errorInfo}
        >
          {this.state.contentHistory.length > 0 && (
            <Button variant="warning" size="md" onClick={this.revert}>
              Revert Last Change
            </Button>
          )}
        </ErrorMessage>
      );
    } else {
      return (
        <InternalSlateOrMarkdownEditor
          {...this.props}
          onEdit={this.onEdit}
          content={this.state.content}
        />
      );
    }
  }
}

/*
  This component:
    1. Handles displaying a slate or a markdown editor
    2. Handles confirmation dialogs for switching between the two
    3. Takes an initial value
    4. Bubbles up change events to the parent

*/

// The resource editor for content
const InternalSlateOrMarkdownEditor: React.FC<SlateOrMarkdownEditorProps> = ({
  editMode,
  projectSlug,
  resourceSlug,
  content,
  toolbarInsertDescs,
  onEdit,
  placeholder,
  onEditorTypeChange,
  editorType,
  allowBlockElements,
  style,
  className,
  textDirection,
  onChangeTextDirection,
}) => {
  // Bit of a hack. Since this isn't a real controlled component, need to keep track of the latest
  // version for validation reasons.
  const [lastContent, setLastContent] = React.useState<ModelElement[]>(content);

  toolbarInsertDescs = useMemo(
    () =>
      toolbarInsertDescs ||
      blockInsertOptions({
        type: allowBlockElements ? 'extended' : 'inline',
      }),
    [allowBlockElements, toolbarInsertDescs],
  );

  const [switchToMarkdownModal, toggleSwitchToMarkdownModal, , closeSwitchMarkdownModal] =
    useToggle();

  const [switchToSlateModal, toggleSwitchToSlateModal, , closeSwitchSlateModal] = useToggle();

  const changeEditor = (editor: 'markdown' | 'slate') => (_e?: any) => {
    closeSwitchMarkdownModal();
    closeSwitchSlateModal();
    onEditorTypeChange && onEditorTypeChange(editor);
  };

  const onContentEdited = React.useCallback(
    (content: ModelElement[]) => {
      setLastContent(content);
      onEdit(content);
    },
    [setLastContent, onEdit],
  );

  if (editorType === 'markdown') {
    return (
      <>
        <MarkdownEditor
          className={className}
          commandContext={{ projectSlug: projectSlug, resourceSlug: resourceSlug }}
          editMode={editMode}
          value={content}
          onSwitchModes={toggleSwitchToSlateModal}
          onEdit={onContentEdited}
          style={style}
          textDirection={textDirection}
          onChangeTextDirection={onChangeTextDirection}
        />
        {switchToSlateModal && (
          <SwitchToSlateModal
            onCancel={toggleSwitchToSlateModal}
            onConfirm={changeEditor('slate')}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <Editor
          className={`structured-content p-1 ${className}`}
          commandContext={{ projectSlug: projectSlug, resourceSlug: resourceSlug }}
          editMode={editMode}
          value={content}
          placeholder={placeholder}
          onEdit={onContentEdited}
          toolbarInsertDescs={toolbarInsertDescs || []}
          onSwitchToMarkdown={toggleSwitchToMarkdownModal}
          textDirection={textDirection}
          onChangeTextDirection={onChangeTextDirection}
          style={style}
        />
        {switchToMarkdownModal && (
          <SwitchToMarkdownModal
            model={lastContent}
            onCancel={toggleSwitchToMarkdownModal}
            onConfirm={changeEditor('markdown')}
          />
        )}
      </>
    );
  }
};

SlateOrMarkdownEditor.defaultProps = {
  allowBlockElements: true,
  textDirection: 'ltr',
};
