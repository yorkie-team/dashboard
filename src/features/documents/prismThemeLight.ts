import type { PrismTheme } from 'prism-react-renderer';

const theme: PrismTheme = {
  plain: {
    backgroundColor: '#faf8f5',
    color: '#728fcb',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata', 'punctuation'],
      style: {
        color: 'rgba(6,50,137,0.5)',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['operator'],
      style: {
        color: 'rgba(6,50,137,0.5)',
      },
    },
    {
      types: ['tag', 'number'],
      style: {
        color: '#2da44e',
      },
    },
    {
      types: ['property', 'function'],
      style: {
        color: 'rgb(140,140,140)',
      },
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: '#2d2006',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: '#896724',
      },
    },
    {
      types: ['string'],
      style: {
        color: '#201f20',
      },
    },
    {
      types: [
        'boolean',
        'entity',
        'url',
        'attr-value',
        'keyword',
        'control',
        'directive',
        'unit',
        'statement',
        'regex',
        'atrule',
      ],
      style: {
        color: '#218bff',
      },
    },
    {
      types: ['placeholder', 'variable'],
      style: {
        color: '#93abdc',
      },
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through',
      },
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['important'],
      style: {
        color: '#896724',
      },
    },
  ],
};

export const getStringStyle = (token: string[]): { style?: { [key: string]: string } } => {
  if (token[0] !== 'string') return {};

  return {
    style: {
      color: '#201f20',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
    },
  };
};

export default theme;
