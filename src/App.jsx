import { useState, useEffect } from "react";
import questions from "./questions";
import "./global.css";

function App() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answerShow, setAnswerShow] = useState(false);

  function handleAnswerSubmit(isCorrect) {
    if (isCorrect) setPuntuacion(puntuacion + 1);
    if (preguntaActual === questions.length - 1) {
      setIsFinished(true);
    } else {
      setPreguntaActual(preguntaActual + 1);
    }
    setTiempoRestante(10);
  }
  const init = () => {
    setPreguntaActual(0);
    setPuntuacion(0);
    setIsFinished(false);
    setTiempoRestante(10);
    setAnswerShow(false);
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  if (isFinished) {
    return (
      <main className="App container-juego-terminado">
        <div className="juego-terminado">
          <span>{`You got ${puntuacion} out of ${questions.length}`}</span>
          <div className="buttons-juego-terminado">
            <button
              onClick={() => {
                window.location.href = "/quiz-app/";
              }}
            >
              Play again
            </button>
            <button
              onClick={() => {
                init()
              }}
            >
              View answers
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (answerShow) {
    return (
      <main className="App">
        <div className="lado-izquierdo agregado-izquierdo">
          <div className="numero-pregunta">
            <span>Question {preguntaActual + 1} of</span> {questions.length}
          </div>
          <div className="titulo-pregunta">
            {questions[preguntaActual].titulo}
          </div>
          <div className="response">
            {
              questions[preguntaActual].options.filter(
                (option) => option.isCorrect
              )[0].textResponse
            }
          </div>
          <button
            className="btn-final-juego"
            onClick={() => {
              if (preguntaActual === questions.length - 1) {
                window.location.href = "/";
              } else {
                setPreguntaActual(preguntaActual + 1);
              }
            }}
          >
            {preguntaActual === questions.length - 1 ? "Play again" : "Next"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="App">
      <div className="ambos-lados">
        <div className="lado-izquierdo">
          <div className="numero-pregunta">
            Question {preguntaActual + 1} of {questions.length}
          </div>
          <div className="titulo-pregunta">
            {questions[preguntaActual].titulo}
          </div>
          <div className="tiempo-restante">
            {!areDisabled ? (
              <span>{`Time remaining ${tiempoRestante}`}</span>
            ) : (
              <button
                onClick={() => {
                  setTiempoRestante(10);
                  setAreDisabled(false);
                  setPreguntaActual(preguntaActual + 1);
                }}
              >
                Continue
              </button>
            )}
          </div>
        </div>
        <div className="lado-derecho">
          {questions[preguntaActual].options.map((response, index) => (
            <button
              disabled={areDisabled}
              key={index}
              onClick={(e) => handleAnswerSubmit(response.isCorrect)}
            >
              {response.textResponse}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
