import Layout from './Layout';
import Main from './Main';

function App() {
  return (
    <div className="App">
      <Layout title="Air Pressure Converter" footer="&copy;penguinspizza">
        <Main />
      </Layout>
    </div>
  );
}

export default App;
