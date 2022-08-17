export type Mark =
  | 'em'
  | 'strong'
  | 'mark'
  | 'del'
  | 'var'
  | 'code'
  | 'term'
  | 'sub'
  | 'sup'
  | 'underline'
  | 'strikethrough';

export enum Marks {
  'em',
  'strong',
  'mark',
  'del',
  'var',
  'code',
  'term',
  'sub',
  'sup',
  'underline',
  'strikethrough',
}

export type FormattedText = Record<'text', string> & Partial<Record<Mark, true>>;
