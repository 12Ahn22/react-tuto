import React, { useState } from 'react';

export default function Iteration() {
  const [names, setNames] = useState([
    { id: 1, text: '봄' },
    { id: 2, text: '여름' },
    { id: 3, text: '가을' },
    { id: 4, text: '겨울' },
  ]);

  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(5);

  const nameList = names.map((name) => <li key={name.id}>{name.text}</li>);

  return <ul>{nameList}</ul>;
}
