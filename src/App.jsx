import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// React-Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Composants de diagnostic
import Header from './components/Header.jsx';
import CounterBuggyFixed from './components/CounterBuggyFixed.jsx';
import UserProfileProps from './components/UserProfileProps.jsx';
import TodoListKeys from './components/TodoListKeys.jsx';
import CartCalculator from './components/CartCalculator.jsx';
import ReportViewer from './components/ReportViewer.jsx';

function App() {
  const [isBuggyMode, setIsBuggyMode] = useState(false);

  const handleToggleMode = () => {
    setIsBuggyMode((prev) => !prev);
  };

  return (
    <div className="debug-app min-vh-100">
      {/* 1. Header avec Switch Mode Buggé / Corrigé */}
      <Header isBuggyMode={isBuggyMode} onToggleMode={handleToggleMode} />

      <main className="py-4">
        <Container>
          {/* Bannière d'état */}
          <div className={`mode-banner text-center py-2 px-4 mb-4 rounded-3 shadow-sm ${isBuggyMode ? 'bg-danger text-white' : 'bg-success text-white'}`}>
            <span className="fw-bold">
              {isBuggyMode
                ? '⚠️ MODE SIMULATEUR DE BUGS ACTIF : Les erreurs de props et de state sont volontairement reproduites.'
                : '✅ MODE PRODUCTION CORRIGÉ : L’ensemble des composants fonctionne selon les bonnes pratiques React.'}
            </span>
          </div>

          {/* Grille des 4 Ateliers de Débogage */}
          <Row className="g-4">
            <Col xs={12} md={6}>
              <CounterBuggyFixed isBuggyMode={isBuggyMode} />
            </Col>
            <Col xs={12} md={6}>
              <UserProfileProps isBuggyMode={isBuggyMode} />
            </Col>
            <Col xs={12} md={6}>
              <TodoListKeys isBuggyMode={isBuggyMode} />
            </Col>
            <Col xs={12} md={6}>
              <CartCalculator isBuggyMode={isBuggyMode} />
            </Col>
          </Row>

          {/* Section Rapport Technique de Débogage */}
          <ReportViewer />
        </Container>
      </main>

      {/* Footer */}
      <footer className="text-center text-secondary py-4 border-top border-dark mt-5">
        <Container>
          <p className="mb-1 text-light-70">
            © 2026 GoMyCode Bootcamp • Checkpoint Debugging React • Développé par <strong>Darius Ange (Karma-22)</strong>
          </p>
          <small className="text-muted">
            Audité avec React Developer Tools • Profiler • Components Inspector
          </small>
        </Container>
      </footer>
    </div>
  );
}

export default App;
