import app from './app';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🌾 KrishiGatha AI Backend Server running at http://localhost:${PORT}`);
  console.log(`   Health Check: http://localhost:${PORT}/api/health`);
});
