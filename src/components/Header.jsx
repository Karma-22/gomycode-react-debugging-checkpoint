import React from 'react';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';

const Header = ({ isBuggyMode, onToggleMode }) => {
  return (
    <header className="debug-header py-5 text-center text-white">
      <Container>
        <div className="d-inline-flex align-items-center gap-2 mb-3">
          <Badge bg="info" className="px-3 py-2 text-dark fw-bold">
            🛠️ REACT DEVELOPER TOOLS AUDIT
          </Badge>
          <Badge bg="warning" text="dark" pill className="px-3 py-1 fw-bold">
            Checkpoint Debugging React
          </Badge>
        </div>

        <h1 className="display-4 fw-extrabold mb-3 title-gradient">
          Atelier de Débogage React
        </h1>
        <p className="lead text-light-50 mx-auto" style={{ maxWidth: '720px' }}>
          Diagnostic, inspection de l'arbre des composants, identification des mutations d'état,
          résolution des problèmes de props et optimisation des cycles de rendu.
        </p>

        {/* Commutateur Interactif : Mode Buggé (Avant) vs Mode Corrigé (Après) */}
        <div className="mode-toggle-card d-inline-flex align-items-center gap-3 p-3 mt-3 rounded-pill shadow">
          <span className={`fw-bold small ${!isBuggyMode ? 'text-success' : 'text-muted'}`}>
            ✅ Mode Corrigé & Validé
          </span>
          <Form.Check
            type="switch"
            id="debug-mode-switch"
            checked={isBuggyMode}
            onChange={onToggleMode}
            className="fs-4 m-0"
          />
          <span className={`fw-bold small ${isBuggyMode ? 'text-danger' : 'text-muted'}`}>
            ⚠️ Mode Buggé (Simulateur d'erreurs)
          </span>
        </div>
      </Container>
    </header>
  );
};

export default Header;
