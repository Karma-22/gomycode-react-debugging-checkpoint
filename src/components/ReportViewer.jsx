import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

const ReportViewer = () => {
  const issues = [
    {
      id: 1,
      title: "Mutation directe de l'état (State Direct Mutation)",
      symptom: "Le compteur ne se met pas à jour visuellement dans l'interface lors des clics.",
      devtools: "Dans l'onglet Components de React DevTools, le state ne change pas ou aucune notification de re-render n'est émise.",
      cause: "Modification directe d'une variable ou de this.state sans passer par setState ou le hook setter.",
      solution: "Remplacement par setCount(prev => prev + 1) pour notifier React et planifier le re-render."
    },
    {
      id: 2,
      title: "Props Undefined / Non concordantes",
      symptom: "Erreur 'Cannot read properties of undefined (reading name)' ou bloc vide.",
      devtools: "L'inspection du composant enfant affiche props: { userData: ... } alors que le composant tente de lire props.userProfile.",
      cause: "Nommage asymétrique entre l'attribut passé par le composant parent et les props déstructurées par l'enfant.",
      solution: "Harmonisation des noms de props, chaînage optionnel (?.), et valeurs par défaut dans les paramètres."
    },
    {
      id: 3,
      title: "Utilisation de l'index de tableau comme clé (Key prop)",
      symptom: "Comportement erratique lors de la suppression ou réorganisation d'éléments d'une liste.",
      devtools: "Avertissement en console 'Each child in a list should have a unique key prop' et persistance incorrecte de l'état local des enfants.",
      cause: "Utilisation de key={index} au lieu d'un identifiant stable et immuable.",
      solution: "Utilisation de key={item.id} unique pour chaque élément du tableau."
    },
    {
      id: 4,
      title: "Erreur de conversion de type (Type Coercion)",
      symptom: "Addition numérique produisant une concaténation de texte ('10020 €' au lieu de '120 €').",
      devtools: "L'inspecteur de state indique que la valeur saisie dans l'input est de type String (\"20\").",
      cause: "Les inputs HTML natifs retournent toujours des chaînes de caractères (event.target.value).",
      solution: "Conversion explicite avec Number(value) ou parseFloat(value) avant tout calcul."
    },
    {
      id: 5,
      title: "Boucle de rendu infinie (Infinite Render Loop)",
      symptom: "Avertissement 'Maximum update depth exceeded' et gel de l'application.",
      devtools: "Le Profiler de React DevTools montre des rendus en continu toutes les millisecondes.",
      cause: "Mise à jour du state appelée directement dans le corps du composant ou useEffect sans tableau de dépendances.",
      solution: "Ajout du tableau de dépendances [deps] approprié dans useEffect et encapsulation des fonctions avec useCallback."
    }
  ];

  return (
    <Card className="border-0 shadow-lg mt-5 report-card overflow-hidden">
      <Card.Header className="bg-dark text-white p-4 border-bottom border-secondary border-opacity-25">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <Badge bg="success" className="px-3 py-2 mb-2">DOCUMENTATION OFFICIELLE</Badge>
            <h3 className="mb-0 fw-bold">Rapport d'Audit & Débogage React DevTools</h3>
          </div>
          <span className="text-secondary small font-monospace">DEBUGGING_REPORT.md</span>
        </div>
      </Card.Header>
      <Card.Body className="p-4 bg-dark bg-opacity-50 text-white">
        <p className="lead text-light-50 fs-6">
          Ce rapport synthétise les anomalies identifiées lors de l'inspection avec <strong>React Developer Tools</strong>,
          leurs causes racines au niveau du Virtual DOM, et les correctifs appliqués conformément aux standards de production React.
        </p>

        <div className="table-responsive mt-4">
          <Table bordered hover variant="dark" className="align-middle">
            <thead className="table-secondary text-dark">
              <tr>
                <th style={{ width: '5%' }}>#</th>
                <th style={{ width: '25%' }}>Problème & Symptôme</th>
                <th style={{ width: '30%' }}>Observation React DevTools</th>
                <th style={{ width: '40%' }}>Cause Racine & Solution Implémentée</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td className="fw-bold text-center text-primary">{issue.id}</td>
                  <td>
                    <strong className="d-block text-warning mb-1">{issue.title}</strong>
                    <small className="text-light-50">{issue.symptom}</small>
                  </td>
                  <td>
                    <small className="text-info font-monospace">{issue.devtools}</small>
                  </td>
                  <td>
                    <div className="small mb-1 text-danger-subtle">
                      <strong>Cause :</strong> {issue.cause}
                    </div>
                    <div className="small text-success">
                      <strong>Solution :</strong> {issue.solution}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReportViewer;
