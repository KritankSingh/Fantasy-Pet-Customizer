document.addEventListener('DOMContentLoaded', () => {
  const petForm = document.getElementById('pet-form');
  const petNameInput = document.getElementById('pet-name');
  const petNameText = document.getElementById('pet-name-text');
  const body = document.getElementById('body');
  const leftEye = document.getElementById('left-eye');
  const rightEye = document.getElementById('right-eye');
  const leftPupil = document.getElementById('left-pupil');
  const rightPupil = document.getElementById('right-pupil');
  const wingLeft = document.getElementById('wing-left');
  const wingRight = document.getElementById('wing-right');
  const tail = document.getElementById('tail');

  function updatePet() {
    // Update pet name text
    const name = petNameInput.value.trim() || 'Your Pet';
    petNameText.textContent = name;

    // Update body shape
    const shape = petForm.shape.value;
    switch(shape) {
      case 'round':
        body.setAttribute('cx', '150');
        body.setAttribute('cy', '150');
        body.setAttribute('r', '80');
        body.setAttribute('fill', '#a0c4ff');
        break;
      case 'square':
        // Replace circle with rect for square shape
        body.outerHTML = '<rect id="body" x="70" y="70" width="160" height="160" rx="20" ry="20" fill="#ffb4a2"></rect>';
        break;
      case 'triangle':
        // Replace circle with polygon for triangle shape
        body.outerHTML = '<polygon id="body" points="150,70 220,210 80,210" fill="#cdb4db"></polygon>';
        break;
    }

    // After shape change, re-select body element
    const newBody = document.getElementById('body');
    if (newBody) {
      // Update tail color to match body fill
      const fillColor = newBody.getAttribute('fill');
      tail.setAttribute('stroke', fillColor);
    }

    // Update eye size
    const eyeSize = petForm.eyeSize.value;
    leftEye.setAttribute('r', eyeSize);
    rightEye.setAttribute('r', eyeSize);
    leftPupil.setAttribute('r', Math.max(eyeSize / 2, 3));
    rightPupil.setAttribute('r', Math.max(eyeSize / 2, 3));

    // Update wing style
    const wingStyle = petForm.wingStyle.value;
    switch(wingStyle) {
      case 'none':
        wingLeft.style.display = 'none';
        wingRight.style.display = 'none';
        break;
      case 'feathered':
        wingLeft.style.display = 'block';
        wingRight.style.display = 'block';
        wingLeft.setAttribute('d', 'M70 150 Q50 100 90 90');
        wingRight.setAttribute('d', 'M230 150 Q250 100 210 90');
        wingLeft.setAttribute('fill', '#bde0fe');
        wingRight.setAttribute('fill', '#bde0fe');
        break;
      case 'bat':
        wingLeft.style.display = 'block';
        wingRight.style.display = 'block';
        wingLeft.setAttribute('d', 'M70 150 Q40 130 90 110 Q60 140 90 90');
        wingRight.setAttribute('d', 'M230 150 Q260 130 210 110 Q240 140 210 90');
        wingLeft.setAttribute('fill', '#6a4c93');
        wingRight.setAttribute('fill', '#6a4c93');
        break;
    }

    // Update tail length
    const tailLength = petForm.tailLength.value;
    // Tail path: M150 230 Q160 270 140 280
    // Adjust control points for length
    const tailPath = `M150 230 Q${150 + (tailLength / 2)} ${230 + tailLength} ${150 - (tailLength / 2)} ${230 + tailLength + 10}`;
    tail.setAttribute('d', tailPath);
  }

  // Initial update
  updatePet();

  // Event listeners
  petForm.addEventListener('input', updatePet);
});
