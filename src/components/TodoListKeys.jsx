import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

/**
 * Bug 3 : Utilisation de l'index comme clé (Key prop issue)
 * 
 * En mode buggé : utilisation de key={index} lors du mapping.
 * En mode corrigé : utilisation de key={item.id} stable et unique.
 */
const TodoListKeys = ({ isBuggyMode }) => {
  const [items, setItems] = useState([
    { id: 'task-1', title: 'Installer React Developer Tools', done: true },
    { id: 'task-2', title: 'Inspecter les composants et props', done: true },
    { id: 'task-3', title: 'Détecter les mutations illégales du state', done: false },
    { id: 'task-4', title: 'Vérifier la stabilité des clés uniques', done: false }
  ]);

  const handleDelete = (idToDelete) => {
    setItems((prev) => prev.filter((item) => item.id !== idToDelete));
  };

  const handleReset = () => {
    setItems([
      { id: 'task-1', title: 'Installer React Developer Tools', done: true },
      { id: 'task-2', title: 'Inspecter les composants et props', done: true },
      { id: 'task-3', title: 'Détecter les mutations illégales du state', done: false },
      { id: 'task-4', title: 'Vérifier la stabilité des clés uniques', done: false }
    ]);
  };

  return (
    <Card className="h-100 shadow-sm border-0 custom-debug-card">
      <Card.Header className="d-flex justify-content-between align-items-center bg-transparent border-bottom">
        <span className="fw-bold">3. Clés de Réconciliation (Keys)</span>
        <Badge bg={isBuggyMode ? 'danger' : 'success'}>
          {isBuggyMode ? 'Bug Actif (key=index)' : 'Corrigé (key=id)'}
        </Badge>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <p className="text-secondary small mb-3">
          {isBuggyMode
            ? 'En mode buggé, les éléments utilisent key={index}. Lors de la suppression, React réutilise les instances de DOM du mauvais élément.'
            : 'En mode corrigé, chaque élément a une clé stable key={item.id}, permettant à l’algorithme de réconciliation de React d’opérer fidèlement.'}
        </p>

        <ul className="list-unstyled mb-3 flex-grow-1">
          {items.map((item, index) => (
            <li
              // Consigne : clé buggée vs clé corrigée
              key={isBuggyMode ? index : item.id}
              className="d-flex justify-content-between align-items-center p-2 mb-2 rounded bg-dark bg-opacity-25"
            >
              <div className="d-flex align-items-center gap-2 small">
                <span>{item.done ? '✅' : '⏳'}</span>
                <span className={item.done ? 'text-decoration-line-through text-muted' : ''}>
                  {item.title}
                </span>
                <Badge bg="secondary" className="font-monospace" style={{ fontSize: '0.65rem' }}>
                  {isBuggyMode ? `index:${index}` : item.id}
                </Badge>
              </div>
              <Button
                variant="outline-danger"
                size="sm"
                className="py-0 px-2"
                onClick={() => handleDelete(item.id)}
              >
                ✕
              </Button>
            </li>
          ))}
        </ul>

        {items.length < 4 && (
          <Button variant="outline-secondary" size="sm" onClick={handleReset} className="mb-2">
            Réinitialiser la liste 🔄
          </Button>
        )}

        <div className="mt-auto text-muted small border-top pt-2">
          <strong>Console Warning React :</strong> <code>Each child in a list should have a unique 'key' prop.</code>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TodoListKeys;
