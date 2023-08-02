import React, { createContext, useContext, useEffect, useState } from 'react';
import { addDogToDb } from './fetch/add-dog';
import { updateFavoriteForDog } from './fetch/update-favorite';
import { deleteDogFromDb } from './fetch/delete-dog-from-db';
const DogContext = createContext({
  dogs: [],
  addDog: () => {},
  deleteDog: () => {},
  unfavoriteDog: () => {},
  favoriteDog: () => {},
});

export function DogProvider({ children }) {
  const [dogs, setDogs] = useState([]);

  const refetchDogs = () => {
    fetch('http://localhost:3000/dogs')
      .then((response) => response.json())
      .then(setDogs)
      .catch((error) => console.error('Error fetching dogs:', error));
  };

  const addDog = (dog) => {
    addDogToDb({
      name: dog.name,
      description: dog.description,
      image: dog.image,
    })
      .then(() => {
        refetchDogs();
      })
      .catch((error) => console.error('Error adding dog:', error));
  };

  const deleteDog = (dogId) => {
    deleteDogFromDb(dogId)
      .then(() => refetchDogs())
      .catch((error) => console.error('Error deleting dog:', error));
  };

  const unfavoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: false })
      .then(() => refetchDogs())
      .catch((error) => console.error('Error updating favorite status:', error));
  };

  const favoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: true })
      .then(() => refetchDogs())
      .catch((error) => console.error('Error updating favorite status:', error));
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  return (
    <DogContext.Provider
      value={{
        dogs,
        addDog,
        deleteDog,
        unfavoriteDog,
        favoriteDog,
        refetchDogs,
      }}
    >
      {children}
    </DogContext.Provider>
  );
}

export function useDogContext() {
  return useContext(DogContext);
}
