import { Routes, Route } from 'react-router-dom';
import { Fonts } from './Components/Fonts';
import { AddSentence } from './Pages/AddSentence/AddSentence';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import { Home } from './Pages/Home/Home';
import { Sentence } from './Pages/Sentence/Sentence';

function App() {
  return (
    <>
      <Fonts />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/add-sentence" element={<AddSentence />} />
        <Route path="/sentences/:sentenceId" element={<Sentence />} />
      </Routes>
    </>
  );
}

export default App;
