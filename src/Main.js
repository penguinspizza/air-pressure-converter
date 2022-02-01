// 参考資料
// https://ja.reactjs.org/docs/lifting-state-up.html

import React, { useState } from "react"; // Reactのインポート
import logo from './logo.svg';
import './Main.css';

const scaleNames = { // 連想配列で単位を列挙
  p: 'psi',
  b: 'bar'
};

const refVal = 14.504; // 換算に共通して使用する値

function toPsi(bar) { // 引数でBarを受け、Psiに変換した値を戻り値とする関数
  return bar * refVal;
}

function toBar(psi) {
  return psi / refVal; // 引数でPsiを受け、Barに変換した値を戻り値とする関数
}

function tryConvert(pressure, convert) { // 引数に圧力値、変換関数を受け取り、変換後の値を返す
  const input = parseFloat(pressure); // 文字列で受け取ったpressureを浮動小数点数に変換して代入
  if (Number.isNaN(input)) { // inputがNaNであり、かつその型がNumberである場合''を返して、この関数を中断
    return '';
  }
  const output = convert(input); // 変換関数で変換した値を代入
  const rounded = Math.round(output * 1000) / 1000; // 小数点以下3桁で四捨五入
  return rounded.toString(); // 文字列に変換して返す
}

function PressureInput(props) {
  const handleChange = (e) => {
    props.onPressureChange(e.target.value);
  }

  const pressure = props.pressure;
  const scale = props.scale;

  return (
    <div className="input-group mt-3 mb-3">
      <input type="number" className="form-control" value={pressure} onChange={handleChange} />
      <span className="input-group-text">{scaleNames[scale]}</span>
    </div>
  );
}

function Calculator(props) {
  const [state, setState] = useState({ pressure: '', scale: 'p' });

  const handlePsiChange = (pressure) => {
    setState({ scale: 'p', pressure: pressure });
  }

  const handleBarChange = (pressure) => {
    setState({ scale: 'b', pressure: pressure });
  }

  const scale = state.scale;
  const pressure = state.pressure;
  const psi = scale === 'b' ? tryConvert(pressure, toPsi) : pressure;
  const bar = scale === 'p' ? tryConvert(pressure, toBar) : pressure;

  return (
    <div>
      <PressureInput
        scale="p"
        pressure={psi}
        onPressureChange={handlePsiChange} />
      <PressureInput
        scale="b"
        pressure={bar}
        onPressureChange={handleBarChange} />
      <div className="Logo">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-muted">Real-time mutual conversion by React</p>
      </div>
    </div>
  );
}

export default Calculator;