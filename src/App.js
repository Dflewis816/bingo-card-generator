import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import FormGroup from './FormGroup';
import styles from './App.module.scss';

const defaultValues = {
  title: 'Calliope Mori Bingo',
  freeText: 'FREE',
  freeTextCentered: true,
  width: 5,
  height: 5,
  fontSize: 100,
  numberOfCards: 1,
  items: [
    'gushing over friends and mentors',
    'PEACE!!!',
    'NARUHODONE',
    'Do not get it Twisted',
    'no salt',
    'It\'s like that',
    'PLEASE, SIR',
    'I hate it',
    'STOP',
    'humming to BGM',
    'Nanchara Kanchara',
    'oisho',
    'SIP',
    'Your Boi',
    'TEE HEE TEE HEE',
    '\"it\'s fine\" x4',
    'trying not to swear and doing it anyway',
    'Kusotori in chat',
    'voice crack',
    'niHongo muzuKAshii!',
    'palm spaghetti',
    'ghost rider',
    'cursed instrument performance',
    'PACHIPACHI PACHIPACHI',
    'sleepy reaper',
    'MIZU!!!',
    '\"Scythe Swinging Lessons\"'
  ],
  // Attempt to load existing values from localStorage
  ...(() => {
    try {
      return JSON.parse(localStorage.getItem('bingo'));
    } catch (e) {
      return {};
    }
  })(),
};

const App = () => {
  const [title, setTitle] = useState(defaultValues.title);
  const [freeText, setFreeText] = useState(defaultValues.freeText);
  const [freeTextCentered, setFreeTextCentered] = useState(defaultValues.freeTextCentered);
  const [width, setWidth] = useState(defaultValues.width);
  const [height, setHeight] = useState(defaultValues.height);
  const [fontSize, setFontSize] = useState(defaultValues.fontSize);
  const [numberOfCards, setNumberOfCards] = useState(defaultValues.numberOfCards);
  const [items, setItems] = useState(defaultValues.items);
  const addInputRef = useRef(null);
  const clickHandler = () => {
    const item = addInputRef.current.value;
    if (item && !items.includes(item)) {
      setItems([ item, ...items ]);
      addInputRef.current.value = '';
    }
    addInputRef.current.focus();
  };
  const removeItem = (item) => {
    setItems([ ...items ].filter((x) => x !== item));
  };

  // Store state values in localStorage when they are changed
  useEffect(() => {
    localStorage.setItem('bingo', JSON.stringify({
      title,
      freeText,
      freeTextCentered,
      width,
      height,
      fontSize,
      numberOfCards,
      items,
    }));
  }, [title, freeText, freeTextCentered, width, height, fontSize, numberOfCards, items]);

  return (
    <div className={styles.App}>
      {/* <div className={styles.Form}>
        <fieldset>
          <FormGroup label="Card title">
            <input type="text" className="form-control" value={title} onChange={(event) => setTitle(event.target.value)} />
          </FormGroup>
          <FormGroup label="Free space">
            <input type="text" className="form-control" value={freeText} onChange={(event) => setFreeText(event.target.value)} />
          </FormGroup>
          <label className="form-check">
            <input type="checkbox" className="form-check-input" checked={freeTextCentered} onChange={(event) => setFreeTextCentered(!freeTextCentered)} />
            <span className="form-check-label">Center the free space?</span>
          </label>
          <FormGroup label="Board Width" after="spaces">
            <input type="number" min="1" className="form-control" value={width} onChange={(event) => setWidth(event.target.value)} />
          </FormGroup>
          <FormGroup label="Board Height" after="spaces">
            <input type="number" min="1" className="form-control" value={height} onChange={(event) => setHeight(event.target.value)} />
          </FormGroup>
          <FormGroup label="Font size" after="%">
            <input type="number" min="5" max="300" step="5" className="form-control" value={fontSize} onChange={(event) => setFontSize(event.target.value)} />
          </FormGroup>
          <FormGroup label="Number of cards" after="cards">
            <input type="number" min="1" className="form-control" value={numberOfCards} onChange={(event) => setNumberOfCards(event.target.value)} />
          </FormGroup>
        </fieldset>
        <div className={styles.Items}>
          <FormGroup label="Add item" after={<button type="button" onClick={clickHandler}>+</button>}>
            <input type="text" className="form-control" defaultValue="" onKeyUp={(event) => { if (event.key === 'Enter') clickHandler(); }} ref={addInputRef} />
          </FormGroup>
          <div>
            <div>
              <ul className="list-group">
                { items.map((item) =>
                  <li key={item} className="list-group-item">
                    <span>{item}</span>
                    <button type="button" onClick={() => removeItem(item)}>
                      &times;
                    </button>
                  </li>
                ) }
              </ul>
            </div>
          </div>
        </div>
      </div> */}
      <div className={styles.Cards}>
        { (new Array(Number(numberOfCards))).fill().map((a, seed) =>
          <Card
            items={items}
            title={title}
            freeText={freeText}
            freeTextCentered={freeTextCentered}
            seed={seed}
            width={width}
            height={height}
            fontSize={fontSize}
          />
        ) }
      </div>
    </div>
  );
};

export default App;
