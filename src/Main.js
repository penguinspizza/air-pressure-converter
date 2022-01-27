// 参考資料
// https://ja.reactjs.org/docs/lifting-state-up.html

import React from "react"; // Reactのインポート
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

class PressureInput extends React.Component { // 入力フィールドをレンダリングするクラス
  constructor(props) {
    super(props); // React.Componentを呼び出してコンストラクタで色々させる
    this.handleChange = this.handleChange.bind(this); // メソッドのバインド
    this.state = { pressure: '' }; // this.state.pressureで値を使用できるステートを宣言
  }

  handleChange(e) {
    this.props.onPressureChange(e.target.value); // 親コンポーネントに値を与えて呼び出す
  }

  render() {
    const pressure = this.props.pressure;
    const scale = this.props.scale;
    return (
      <div className="input-group mt-3 mb-3">
        <input type="number" className="form-control" value={pressure} onChange={this.handleChange} />
        <span className="input-group-text">{scaleNames[scale]}</span>
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handlePsiChange = this.handlePsiChange.bind(this);
    this.handleBarChange = this.handleBarChange.bind(this);
    this.state = { pressure: '', scale: 'p' };
  }

  handlePsiChange(pressure) {
    this.setState({ scale: 'p', pressure });
  }

  handleBarChange(pressure) {
    this.setState({ scale: 'b', pressure });
  }

  render() {
    const scale = this.state.scale;
    const pressure = this.state.pressure;
    const psi = scale === 'b' ? tryConvert(pressure, toPsi) : pressure;
    const bar = scale === 'p' ? tryConvert(pressure, toBar) : pressure;

    return (
      <div>
        <PressureInput
          scale="p"
          pressure={psi}
          onPressureChange={this.handlePsiChange} />
        <PressureInput
          scale="b"
          pressure={bar}
          onPressureChange={this.handleBarChange} />
        <div className="Logo">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="text-muted">Real-time mutual conversion by React</p>
        </div>
      </div>
    );
  }
}

export default Calculator;