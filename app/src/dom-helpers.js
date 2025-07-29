// DOM helper functions for manipulating the DOM

// Create a single palette element
export const createPaletteElement = (palette) => {
  const div = document.createElement('div');
  div.className = 'palette-item';
  div.dataset.uuid = palette.uuid;
  
  div.innerHTML = `
    <div class="palette-title">${palette.title}</div>
    <div class="palette-colors">
      ${palette.colors.map((color, index) => `
        <div class="color-example" style="background-color: ${color.hex}">
          <span class="example-text">Example</span>
          <button class="hex-copy-button" data-color="${color.hex}">${color.hex}</button>
        </div>
      `).join('')}
    </div>
    <button class="delete-button" data-uuid="${palette.uuid}">Delete Palette</button>
    <div class="temperature-banner ${palette.temperature}">${palette.temperature}</div>
  `;
  
  return div;
}

// Render all palettes
export const renderPalettes = (palettes) => {
  const palettesGrid = document.querySelector('.palettes-grid');
  palettesGrid.innerHTML = '';
  
  Object.values(palettes).forEach(palette => {
    const paletteElement = createPaletteElement(palette);
    palettesGrid.appendChild(paletteElement);
  });
}

// Clear the form
export const clearForm = () => {
  const form = document.querySelector('form');
  form.reset();
  // Reset to default colors
  document.getElementById('color-1').value = '#ff0000';
  document.getElementById('color-2').value = '#00ff00';
  document.getElementById('color-3').value = '#0000ff';
}

// Copy color to clipboard
export const copyToClipboard = async (text, button) => {
  try {
    await navigator.clipboard.writeText(text);
    const originalText = button.textContent;
    button.textContent = 'Copied hex!';
    button.style.background = '#4CAF50';
    button.style.color = 'white';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = 'rgba(255, 255, 255, 0.9)';
      button.style.color = 'black';
    }, 1000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
} 