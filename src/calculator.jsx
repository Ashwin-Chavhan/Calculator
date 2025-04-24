import { useState } from 'react';
import Display from './display';
import Button from './button';
import { evaluate } from 'mathjs';


function Calculator() {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    if (value === 'AC') {
      setInput('');
    } else if (value === '⌫') {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === '+/-') {
      setInput((prev) => {
        if (prev.charAt(0) === '-') return prev.substring(1);
        else return '-' + prev;
      });
    } else if (value === '%') {
      try {
        setInput((prev) => (parseFloat(prev) / 100).toString());
      } catch {
        setInput('Error');
      }
    } else if (value === '=') {
      try {
        setInput(evaluate(input).toString());
      } catch {
        setInput('Error');
      }
    } else {
      setInput(input + value);
    }
  };
  
  
  

  const buttons = [
  'AC', '⌫', '%', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', '=', '+/-'
  ];
  

  return (
    <div className="calculator">
      <Display value={input} />
      <div className="buttons">
  {buttons.map((btn, idx) => (
    <Button
      key={idx}
      value={btn}
      onClick={handleClick}
      className={
        btn === '=' ? 'btn-equals' :
        btn === '⌫' ? 'btn-back' :
        btn === 'AC' ? 'btn-clear' :
        btn === '0' ? 'btn-zero' :
        ''
      }
    />
  ))}
</div>

    </div>
  );
}

export default Calculator;
