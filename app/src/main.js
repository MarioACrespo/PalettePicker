import './style.css'
import { v4 as generateUUID } from 'uuid';
import { getPalettes, initPalettesIfEmpty, addPalette, removePaletteById, clearPalettes } from './local-storage.js';
import { renderPalettes, clearForm, copyToClipboard } from './dom-helpers.js';

// Initialize the application
const init = () => {
  // Clear localStorage to ensure fresh start with new structure
  clearPalettes();
  
  // Initialize palettes if empty (load defaults on first visit)
  initPalettesIfEmpty();
  
  // Render existing palettes
  const palettes = getPalettes();
  renderPalettes(palettes);
  
  // Set up event listeners
  setupEventListeners();
}

// Set up all event listeners
const setupEventListeners = () => {
  // Form submission
  const form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
  
  // Copy buttons (delegated event handling)
  document.addEventListener('click', handleCopyClick);
  
  // Delete buttons (delegated event handling)
  document.addEventListener('click', handleDeleteClick);
}

// Handle form submission
const handleFormSubmit = (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const title = formData.get('title');
  const color1 = formData.get('color1');
  const color2 = formData.get('color2');
  const color3 = formData.get('color3');
  const temperature = formData.get('temperature');
  
  // Create new palette object with new color structure
  const newPalette = {
    uuid: generateUUID(),
    title: title,
    colors: [
      {
        hex: color1,
        label: "Text Example"
      },
      {
        hex: color2,
        label: "Text Example"
      },
      {
        hex: color3,
        label: "Text Example"
      }
    ],
    temperature: temperature
  };
  
  // Add to localStorage
  addPalette(newPalette);
  
  // Re-render palettes
  const palettes = getPalettes();
  renderPalettes(palettes);
  
  // Clear form
  clearForm();
}

// Handle copy button clicks
const handleCopyClick = (e) => {
  if (e.target.classList.contains('hex-copy-button')) {
    const color = e.target.dataset.color;
    copyToClipboard(color, e.target);
  }
}

// Handle delete button clicks
const handleDeleteClick = (e) => {
  if (e.target.classList.contains('delete-button')) {
    const uuid = e.target.dataset.uuid;
    
    // Remove from localStorage
    removePaletteById(uuid);
    
    // Remove from DOM
    const paletteElement = document.querySelector(`[data-uuid="${uuid}"]`);
    if (paletteElement) {
      paletteElement.remove();
    }
  }
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
