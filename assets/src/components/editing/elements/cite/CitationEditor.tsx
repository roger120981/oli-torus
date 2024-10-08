import React, { createRef, useEffect, useState } from 'react';
import * as Immutable from 'immutable';
import { BibEntry } from 'data/content/bibentry';
import { Model } from 'data/content/model/elements/factories';
import { Citation } from 'data/content/model/elements/types';
import * as ContentModel from 'data/content/model/elements/types';
import * as BibPersistence from 'data/persistence/bibentry';
import { CommandContext } from '../commands/interfaces';

const Cite = (window as any).cite;

type ExistingCiteEditorProps = {
  onSelectionChange: (content: ContentModel.Citation) => void;
  model?: Citation;
  commandContext: CommandContext;
};

export const CitationEditor = (props: ExistingCiteEditorProps) => {
  const inputEl = createRef<HTMLButtonElement>();
  const [bibEntrys, setBibEntrys] = useState<Immutable.List<BibEntry>>(Immutable.List<BibEntry>());
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<Citation>(
    props.model ? props.model : Model.cite('citation', -1),
  );

  const onClick = (slug: string) => {
    const bibEntry = bibEntrys.find((e) => e.slug === slug);
    if (bibEntry && bibEntry.id) {
      const selection: Citation = Model.cite('[citation]', bibEntry.id);
      props.onSelectionChange(selection);
      setSelected(selection);
    }
  };

  const fetchBibEntrys = async () => {
    setLoading(true);
    try {
      const result = await BibPersistence.fetch(props.commandContext.projectSlug);
      if (result.result === 'success') {
        return setBibEntrys(Immutable.List<BibEntry>(result.rows));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBibEntrys();
  }, []);

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.scrollIntoView();
    }
  });

  const createBibEntryEditors = () => {
    if (!bibEntrys.isEmpty()) {
      return bibEntrys.map((bibEntry) => {
        const bibOut = () => {
          const data = new Cite(bibEntry.content.data);
          return data.format('bibliography', {
            format: 'html',
            template: 'apa',
            lang: 'en-US',
            // include any note, used for URL in legacy bib entries
            append: (entry: any) => ` ${entry.note}`,
          });
        };

        const classes =
          selected.bibref === bibEntry.id
            ? 'w-full px-4 py-2 text-left bg-gray-200 border-b border-gray-200 cursor-pointer focus:outline-none dark:bg-gray-800 dark:border-gray-600'
            : 'w-full px-4 py-2 text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white';

        const r = selected.bibref === bibEntry.id ? { ref: inputEl } : {};

        return (
          <button
            {...r}
            key={bibEntry.slug}
            className={classes}
            onClick={() => onClick(bibEntry.slug)}
          >
            <div dangerouslySetInnerHTML={{ __html: bibOut() }}></div>
          </button>
        );
      });
    }
    if (loading) return <div className="d-flex justify-content-start mb-4">loading...</div>;
    return <div className="d-flex justify-content-start mb-4">No bibliography entries</div>;
  };

  const bibEditors = createBibEntryEditors();

  return (
    <div
      className="settings-editor-wrapper"
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div
        className="text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        style={{ maxHeight: '460px' }}
      >
        {bibEditors}
      </div>
    </div>
  );
};
