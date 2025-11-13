// camera

const videoElement = document.getElementById('camera-feed');
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
  // Define as restrições de mídia: aqui, apenas o vídeo é necessário
  const constraints = { video: true, audio: false };

  // Pede acesso à câmera
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      // Se bem-sucedido, define o fluxo de mídia para o elemento de vídeo
      videoElement.srcObject = stream;
    })
    .catch(error => {
      console.error('Erro ao acessar a câmera:', error);
    });
});