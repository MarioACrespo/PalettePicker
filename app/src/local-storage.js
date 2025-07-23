import palettes from './palettes.json';
import { v4 as generateUUID } from 'uuid';

// We've given these to you for free! Use them in the helpers below
const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const getLocalStorageKey = (key) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error('Error parsing localStorage value:', error);
    return null;
  }
}

// Convert array to object with UUIDs for localStorage
const convertArrayToObject = (palettesArray) => {
  const palettesObject = {};
  palettesArray.forEach(palette => {
    const uuid = generateUUID();
    palettesObject[uuid] = {
      ...palette,
      uuid: uuid
    };
  });
  return palettesObject;
}

// Convert object back to array for display
const convertObjectToArray = (palettesObject) => {
  return Object.values(palettesObject);
}

// Clear localStorage to force fresh start with new structure
const clearPalettes = () => {
  localStorage.removeItem('palettes');
}

// Replace whatever palettes are saved in `localStorage` with the provided object of `newPalettes`
const setPalettes = (newPalettes) => {
  setLocalStorageKey('palettes', newPalettes);
}

// Always return an object, either full of palettes or empty. If it always returns an object, it will make the code that uses this function simpler.
const getPalettes = () => {
  const storedPalettes = getLocalStorageKey('palettes');
  return storedPalettes || {};
}

// If you don't have any palettes on page load, then you should add the default palettes to localStorage. *To be clear, that's on page load, not immediately following the event that they delete all of the palettes*. So if the user deletes each palette, only if they refresh the page, the defaults will appear
const initPalettesIfEmpty = () => {
  const currentPalettes = getPalettes();
  if (Object.keys(currentPalettes).length === 0) {
    const palettesWithUUIDs = convertArrayToObject(palettes);
    setPalettes(palettesWithUUIDs);
  }
}

// Add the palette to your saved localStorage palettes. First retrieve the existing palettes, add the new palette to the object, and then set the palettes again.
const addPalette = (newPalette) => {
  const currentPalettes = getPalettes();
  currentPalettes[newPalette.uuid] = newPalette;
  setPalettes(currentPalettes);
}

// Remove the palette from your saved localStorage palettes as found by the palette's `uuid`. First retrieve the existing palettes, find and remove the specified palette from the object, and then set the palettes again.
const removePaletteById = (uuid) => {
  const currentPalettes = getPalettes();
  delete currentPalettes[uuid];
  setPalettes(currentPalettes);
}

// Export the functions that form the data layer API
export {
  getPalettes,
  initPalettesIfEmpty,
  addPalette,
  removePaletteById,
  clearPalettes
} 