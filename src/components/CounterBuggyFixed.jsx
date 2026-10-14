import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

/**
 * Bug 1 : Mutation directe du State
 * 
 * En mode buggé : l'état est muté directement sans déclencher de re-render (count = count + 1).
 * En mode corrigé : utilisation de setCount(prev => prev + 1).
 */
const CounterBuggyFixed = ({ isBuggyMode }) => {
  const [count, setCount] = useState(0);
  const [buggyCount, setBuggyCount] = useState(0);
  const [renderNotice, setRenderNotice] = useState('');

  // Incrémentation correcte
  const handleCorrectIncrement = () => {
    setCount((prev) => prev + 1);
    setRenderNotice('Re-render déclenché avec succès !');
  };

  // Mutation incorrecte (Bug)
  const handleBuggyIncrement = () => {
    // eslint-disable-next-line react/no-direct-mutation-state
    window.__buggyCount = (window.__buggyCount || 0) + 1;
    setRenderNotice('Valeur modifiée en mémoire mais AUCUN re-render React DevTools !');
  };

  return (
    <Card className="h-100 shadow-sm border-0 custom-debug-card">
      <Card.Header className="d-flex justify-content-between align-items-center bg-transparent border-bottom">
        <span className="fw-bold">1. Mutation d'État vs setState</span>
        <Badge bg={isBuggyMode ? 'danger' : 'success'}>
          {isBuggyMode ? 'Bug Actif' : 'Corrigé'}
        </Badge>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <p className="text-secondary small mb-3">
          {isBuggyMode
            ? 'En mode buggé, la variable est incrémentée sans setState fonctionnel : le composant ne se met pas à jour visuellement dans le DOM.'
            : 'En mode corrigé, setCount utilise une fonction de rappel garantissant la valeur la plus récente et déclenchant le re-render.'}
        </p>

        <div className="text-center my-auto py-3 bg-dark bg-opacity-25 rounded-3">
          <span className="display-4 fw-extrabold text-primary font-monospace">
            {isBuggyMode ? (window.__buggyCount || 0) : count}
          </span>
          <small className="d-block text-muted mt-1">Valeur actuelle du compteur</small>
        </div>

        <div className="d-grid gap-2 mt-4">
          <Button
            variant={isBuggyMode ? 'danger' : 'primary'}
            onClick={isBuggyMode ? handleBuggyIncrement : handleCorrectIncrement}
            className="fw-bold"
          >
            {isBuggyMode ? 'Incrémenter (Mutation Directe ❌)' : 'Incrémenter avec setState ✅'}
          </Button>
        </div>

        {renderNotice && (
          <div className="mt-2 text-center small text-warning">
            ℹ {renderNotice}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CounterBuggyFixed;
