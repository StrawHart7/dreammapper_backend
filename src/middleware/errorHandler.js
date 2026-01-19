function errorHandler(err, req, res, next) {
  console.error('❌ Erreur:', err);

  if (err.code === 'P2002') {
    return res.status(409).json({
      error: 'Cette valeur existe déjà (email, etc.)'
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      error: 'Ressource introuvable'
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Données invalides',
      details: err.message
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Erreur serveur interne',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = errorHandler;