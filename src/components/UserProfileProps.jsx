import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

/**
 * Bug 2 : Nom de prop incorrect / Props manquantes
 * 
 * En mode buggé : le parent passe 'userData' mais le composant attend 'userProfile' -> Crash ou undefined.
 * En mode corrigé : nom de prop aligné avec déstructuration sécurisée, fallback et chaînage optionnel.
 */
const UserProfileProps = ({ isBuggyMode }) => {
  const sampleUser = {
    name: "Darius Ange",
    role: "Développeur React",
    email: "dariusange222@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  };

  return (
    <Card className="h-100 shadow-sm border-0 custom-debug-card">
      <Card.Header className="d-flex justify-content-between align-items-center bg-transparent border-bottom">
        <span className="fw-bold">2. Gestion des Props Undefined</span>
        <Badge bg={isBuggyMode ? 'danger' : 'success'}>
          {isBuggyMode ? 'Bug Actif' : 'Corrigé'}
        </Badge>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <p className="text-secondary small mb-3">
          {isBuggyMode
            ? 'En mode buggé, le composant tente d’accéder à props.userProfile.name alors que le parent a fourni props.userData.'
            : 'En mode corrigé, les props sont normalisées et protégées par chaînage optionnel (?.) et valeurs par défaut.'}
        </p>

        <div className="p-3 bg-dark bg-opacity-25 rounded-3 my-auto">
          {isBuggyMode ? (
            <div className="text-danger small">
              <strong>⚠️ Bug React DevTools :</strong>
              <p className="mb-1"><code>Cannot read properties of undefined (reading 'name')</code></p>
              <span className="text-muted">Props inspectée : <code>props.userProfile === undefined</code></span>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3">
              <img
                src={sampleUser.avatar}
                alt={sampleUser.name}
                className="rounded-circle shadow-sm"
                style={{ width: '56px', height: '56px', objectFit: 'cover' }}
              />
              <div>
                <h5 className="mb-0 fw-bold">{sampleUser.name}</h5>
                <small className="text-primary fw-semibold">{sampleUser.role}</small>
                <div className="text-muted small">{sampleUser.email}</div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 text-muted small border-top pt-2">
          <strong>Solution :</strong> Valider les props avec PropTypes ou des paramètres par défaut : <code>const Profile = (&#123; user = &#123;&#125; &#125;) =&gt; ...</code>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserProfileProps;
