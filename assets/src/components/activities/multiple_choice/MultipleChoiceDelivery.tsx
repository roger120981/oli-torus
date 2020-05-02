import React from 'react';
import ReactDOM from 'react-dom';
import { DeliveryElement, DeliveryElementProps } from '../DeliveryElement';
import { MultipleChoiceModelSchema } from './schema';
import { Choice } from 'components/activities/multiple_choice/schema';
import * as ActivityTypes from '../types';
import { shuffle } from './utils';
import { ContentWriter } from 'data/content/writers/writer';
import { impl } from 'data/content/writers/html';

const data = [
  {
    type: 'content',
    id: 2635423624,
    children: [
      {
        type: 'h3',
        id: 2652513352,
        children: [
          {
            text: 'Introduction',
          },
        ],
      },
      {
        type: 'p',
        id: 2652513352,
        children: [
          {
            text: 'The American Revolution was a colonial revolt which occurred between 1765 and 1783. The American Patriots in the Thirteen Colonies defeated the British in the American Revolutionary War (1775–1783) with the assistance of France, winning independence from Great Britain and establishing the United States of America.',
          },
        ],
      },
      {
        type: 'p',
        id: 2652513352,
        children: [
          {
            text: '',
          },
        ],
      },
      {
        type: 'img',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Declaration_of_Independence_%281819%29%2C_by_John_Trumbull.jpg/480px-Declaration_of_Independence_%281819%29%2C_by_John_Trumbull.jpg',
        children: [
          {
            text: '',
          },
        ],
        id: 1856577103,
        caption: "John Trumbull's Declaration of Independence, showing the Committee of Five presenting its draft for approval by Second Continental Congress on June 28, 1776",
        alt: 'American Revolution',
      },
      {
        type: 'p',
        id: 2652513352,
        children: [
          {
            text: '',
          },
        ],
      },
      {
        type: 'p',
        id: 2652513352,
        children: [
          {
            text: 'The American colonials proclaimed "no taxation without representation" starting with the ',
          },
          {
            type: 'a',
            href: 'https://en.wikipedia.org/wiki/Stamp_Act_Congress',
            target: 'self',
            children: [
              {
                text: 'Stamp Act Congress',
              },
            ],
            id: 104398604,
          },
          {
            text: " in 1765. They had no representatives in the British Parliament and so rejected Parliament's authority to tax them. Protests steadily escalated to the Boston Massacre in 1770 and the burning of the Gaspee in Rhode Island in 1772, followed by the Boston Tea Party in December 1773. The British responded by closing Boston Harbor and enacting a series of punitive laws which effectively rescinded Massachusetts Bay Colony's rights of self-government. The other colonies rallied behind Massachusetts, and a group of American Patriot leaders set up their own government in late 1774 at the Continental Congress to coordinate their resistance of Britain; other colonists retained their allegiance to the Crown and were known as Loyalists or Tories.",
          },
        ],
      },
      {
        type: 'p',
        id: 2652513352,
        children: [
          {
            text: 'Among the significant results of the Revolution were American independence and friendly economic trade with Britain. The Americans adopted the United States Constitution, establishing a strong national government which included an elected executive, a national judiciary, and an elected bicameral Congress representing states in the Senate and the population in the House of Representatives. Around 60,000 Loyalists migrated to other British territories, particularly to British North America (Canada), but the great majority remained in the United States.',
          },
        ],
      },
      {
        type: 'p',
        id: 2652513352,
        children: [
          {
            text: '',
          },
        ],
      },
      {
        type: 'h3',
        id: 2652513352,
        children: [
          {
            text: '1651–1748: Early seeds',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'As early as 1651, the English government had sought to regulate trade in the American colonies, and Parliament passed the Navigation Acts on October 9 to provide the plantation colonies of the south with a profitable export market. The Acts prohibited British producers from growing tobacco and also encouraged shipbuilding, particularly in the New England colonies. Some argue that the economic impact was minimal on the colonists, but the political friction which the acts triggered was more serious, as the merchants most directly affected were also the most politically active.',
          },
        ],
        id: 834766828,
      },
      {
        type: 'p',
        children: [
          {
            text: '',
          },
        ],
        id: 834766828,
      },
      {
        type: 'img',
        src: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Map_of_territorial_growth_1775.jpg',
        children: [
          {
            text: '',
          },
        ],
        id: 2607239386,
        caption: 'Eastern North America in 1775. The British Province of Quebec, the Thirteen Colonies on the Atlantic coast, and the Indian Reserve as defined by the Royal Proclamation of 1763. The border between the red and pink areas represents the 1763 "Proclamation line", while the orange area represents the Spanish claim.',
        alt: 'Boundary between Mississippi River and 49th Parallel',
      },
      {
        type: 'p',
        children: [
          {
            text: '',
          },
        ],
        id: 3785207307,
      },
      {
        type: 'p',
        children: [
          {
            text: "King Philip's War ended in 1678, which the New England colonies fought without any military assistance from England, and this contributed to the development of a unique identity separate from that of the British people. But King Charles II determined to bring the New England colonies under a more centralized administration in the 1680s in order to regulate trade to more effectively benefit the homeland. The New England colonists fiercely opposed his efforts, and the Crown nullified their colonial charters in response. Charles' successor James II finalized these efforts in 1686, establishing the consolidated Dominion of New England. Dominion rule triggered bitter resentment throughout New England; the enforcement of the unpopular Navigation Acts and the curtailing of local democracy angered the colonists. New Englanders were encouraged, however, by a change of government in England which saw James II effectively abdicate, and a populist uprising in New England overthrew Dominion rule on April 18, 1689. Colonial governments reasserted their control in the wake of the revolt, and successive governments made no more attempts to restore the Dominion.",
          },
        ],
        id: 834766828,
      },
      {
        type: 'p',
        children: [
          {
            text: "Some writers begin their histories of the American Revolution with the British coalition victory in the Seven Years' War in 1763, viewing the French and Indian War as though it were the American theater of the Seven Years' War. Lawrence Henry Gipson writes:",
          },
        ],
        id: 834766828,
      },
      {
        type: 'blockquote',
        children: [
          {
            text: 'It may be said as truly that the American Revolution was an aftermath of the Anglo-French conflict in the New World carried on between 1754 and 1763.',
          },
        ],
        id: 2111410300,
      },
      {
        type: 'p',
        children: [
          {
            text: 'Some more unrelated content...',
            strong: true,
          },
        ],
        id: 1713658991,
      },
      {
        type: 'ol',
        children: [
          {
            type: 'li',
            children: [
              {
                text: 'one',
              },
            ],
            id: 1896247178,
          },
          {
            type: 'li',
            children: [
              {
                text: 'two',
                em: true,
              },
            ],
            id: 1896247178,
          },
          {
            type: 'li',
            children: [
              {
                text: 'three',
                strong: true,
                em: true,
              },
            ],
            id: 1896247178,
          },
        ],
        id: 2019918354,
      },
      {
        type: 'p',
        children: [
          {
            text: '',
          },
        ],
        id: 2420740706,
      },
      {
        type: 'ul',
        children: [
          {
            type: 'li',
            children: [
              {
                text: 'alpha',
              },
            ],
            id: 18868465,
          },
          {
            type: 'li',
            children: [
              {
                text: 'beta',
              },
            ],
            id: 18868465,
          },
          {
            type: 'li',
            children: [
              {
                text: 'gamma',
              },
            ],
            id: 18868465,
          },
        ],
        id: 1613969244,
      },
      {
        type: 'p',
        children: [
          {
            text: '',
          },
        ],
        id: 2718608963,
      },
      {
        type: 'p',
        children: [
          {
            text: '',
          },
        ],
        id: 1037020602,
      },
      {
        type: 'youtube',
        src: 'fhdCslFcKFU',
        children: [
          {
            text: '',
          },
        ],
        id: 443257163,
      },
      {
        type: 'p',
        children: [
          {
            text: '',
          },
        ],
        id: 3870729153,
      },
      {
        type: 'code',
        language: 'python',
        showNumbers: false,
        startingLineNumber: 1,
        children: [
          {
            type: 'code_line',
            children: [
              {
                text: 'import fresh-pots',
              },
            ],
          },
        ],
        id: 4076323894,
      },
      {
        type: 'p',
        children: [
          {
            text: '',
          },
        ],
        id: 169365459,
      },
    ],
    purpose: 'None',
  },
];

const Html = ({ data } : any) => <div dangerouslySetInnerHTML={{
  __html: new ContentWriter().render({}, data, impl()),
}} />;

const Stem = ({ stem }: any) => {
  return (
    <Html data={stem.content} />
  );
};

interface ChoicesProps {
  choices: Choice[];
}
const Choices = ({ choices }: ChoicesProps) => {
  return (
    <div style={{
      display: 'grid',
      gridGap: '8px',
      gridTemplateColumns: '1fr',
    }}>
    {choices.map((choice, index) => <Choice choice={choice} index={index} />)}
    </div>
  );
};

interface ChoiceProps {
  choice: Choice;
  index: number;
}
const Choice = ({ choice, index }: ChoiceProps) => {
  return (
    <div
        style={{
          display: 'inline-flex',
          alignItems: 'top',
          borderWidth: '2px 2px 4px',
          padding: '12px 16px',
          cursor: 'pointer',
          borderRadius: '16px',
          borderStyle: 'solid',
          transform: 'translateZ(0)',
          borderColor: '#e5e5e5',
        }}
        key={choice.id}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #e5e5e5',
            borderRadius: '8px',
            color: '#afafaf',
            height: '30px',
            width: '30px',
            fontWeight: 'bold',
            marginRight: '16px',
          }}>{index + 1}</span>
        <Html data={choice.content} />
      </div>
  );
};

interface HintsProps {

}
const Hints = ({}: HintsProps) => {
  return (
    <div
      style={{
        padding: '16px',
        border: '1px solid rgba(34,36,38,.15)',
        borderRadius: '5px',
        boxShadow: '0 1px 2px 0 rgba(34,36,38,.15)',
        position: 'relative',
      }}
      className="question-hints">
      <div style={{
        position: 'absolute',
        left: '0',
        bottom: '-3px',
        borderTop: '1px solid rgba(34,36,38,.15)',
        height: '6px',
        width: '100%',
      }}></div>
        <h6><b>Hints</b></h6>
        <button className="btn btn-primary muted">Request Hint</button>
    </div>
  );
};

const MultipleChoice = (props: DeliveryElementProps<MultipleChoiceModelSchema>) => {
  const { stem, choices } = props.model;

  return (
    <div style={{
      display: 'grid',
      flex: '1',
      alignItems: 'center',
      gridTemplateRows: 'min-content 1fr',
      gridGap: '8px',
    }}>
      <Stem stem={stem} />
      <Choices choices={shuffle(choices)} />
      <Hints />
    </div>
  );
};

// Defines the web component, a simple wrapper over our React component above
export class MultipleChoiceDelivery extends DeliveryElement<MultipleChoiceModelSchema> {
  render(mountPoint: HTMLDivElement, props: DeliveryElementProps<MultipleChoiceModelSchema>) {
    ReactDOM.render(<MultipleChoice {...props} />, mountPoint);
  }
}

// Register the web component:
const manifest = require('./manifest.json') as ActivityTypes.Manifest;
window.customElements.define(manifest.delivery.element, MultipleChoiceDelivery);
