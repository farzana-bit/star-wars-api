const CharacterCard = ({
  name,
  gender,
  birth_year,
  eye_color,
  hair_color,
  height,
  mass,
  skin_color,
  homeworld,
  created,
  edited
}) => {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  return (
    <div className="sciFiCard card">
      <div className="sciFiLeft card-left">
        <div className="iconPlaceholder">
          <i className="fas fa-user"></i>
        </div>
        <h2 className="characterName">{name}</h2>
      </div>

      <div className="sciFiRight card-right">
        <p><strong>Birth Year:</strong> {birth_year}</p>
        <p><strong>Gender:</strong> {gender}</p>
        <p><strong>Eye Color:</strong> {eye_color}</p>
        <p><strong>Hair Color:</strong> {hair_color}</p>
        <p><strong>Skin Color:</strong> {skin_color}</p>
        <p><strong>Height:</strong> {height} cm</p>
        <p><strong>Mass:</strong> {mass} kg</p>
        <p><strong>Created:</strong> {formatDate(created)}</p>
        <p><strong>Edited:</strong> {formatDate(edited)}</p>
        <p>
          <strong>Homeworld:</strong>{' '}
          <a href={homeworld} target="_blank" rel="noreferrer">
            {homeworld.split('/').filter(Boolean).pop()}
          </a>
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
