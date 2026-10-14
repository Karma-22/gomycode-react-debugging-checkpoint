import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';

/**
 * Bug 4 : Problème de type / Concaténation non désirée
 * 
 * En mode buggé : calcul de total avec input non converti ("25" + 10 = "2510 €").
 * En mode corrigé : conversion explicite avec Number() ou parseFloat().
 */
const CartCalculator = ({ isBuggyMode }) => {
  const [basePrice] = useState(100);
  const [discount, setDiscount] = useState("20");

  // Calcul du prix final
  // Bug : "100" - "20" fonctionne, mais basePrice + discount donnerait "10020"
  const calculateTotal = () => {
    if (isBuggyMode) {
      // Concaténation de chaîne au lieu d'addition
      return `${basePrice}${discount} € (Erreur de type chaîne)`;
    }
    const numericDiscount = Number(discount) || 0;
    return `${(basePrice + numericDiscount).toFixed(2)} €`;
  };

  return (
    <Card className="h-100 shadow-sm border-0 custom-debug-card">
      <Card.Header className="d-flex justify-content-between align-items-center bg-transparent border-bottom">
        <span className="fw-bold">4. Erreurs de Typage & Concaténation</span>
        <Badge bg={isBuggyMode ? 'danger' : 'success'}>
          {isBuggyMode ? 'Bug Actif ("100" + "20")' : 'Corrigé (Number)'}
        </Badge>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <p className="text-secondary small mb-3">
          {isBuggyMode
            ? 'En mode buggé, les données issues d’un champ input sont de type string, produisant une concaténation "10020" au lieu d’une somme mathématique.'
            : 'En mode corrigé, la conversion explicite avec Number() ou parseFloat() garantit une opération arithmétique rigoureuse.'}
        </p>

        <div className="p-3 bg-dark bg-opacity-25 rounded-3 mb-3">
          <div className="d-flex justify-content-between mb-2 small">
            <span>Prix de base :</span>
            <strong>{basePrice} €</strong>
          </div>
          <Form.Group className="d-flex align-items-center gap-2 mb-2">
            <Form.Label className="small mb-0 text-nowrap">Frais additionnels :</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="bg-dark text-white border-secondary"
            />
          </Form.Group>
          <div className="d-flex justify-content-between align-items-center pt-2 border-top">
            <span className="fw-bold">Total Calculé :</span>
            <span className={`fw-extrabold fs-5 ${isBuggyMode ? 'text-danger' : 'text-success'}`}>
              {calculateTotal()}
            </span>
          </div>
        </div>

        <div className="mt-auto text-muted small border-top pt-2">
          <strong>Inspection React DevTools :</strong> Dans l'onglet Components, la prop ou le state apparaît comme <code>"20"</code> (String) au lieu de <code>20</code> (Number).
        </div>
      </Card.Body>
    </Card>
  );
};

export default CartCalculator;
