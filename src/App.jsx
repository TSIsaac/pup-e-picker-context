import React, { useEffect, useState } from "react";
import "./App.css";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import "./fonts/RubikBubbles-Regular.ttf";
import { useDogContext } from "./DogContext";

function App() {
  const { dogs, addDog, deleteDog, unfavoriteDog, favoriteDog, refetchDogs } =
    useDogContext();

  const [showComponent, setShowComponent] = useState("all-dogs");

  const unfavorited = dogs.filter((dog) => !dog.isFavorite);
  const favorited = dogs.filter((dog) => dog.isFavorite);

  let filteredDogs = (() => {
    if (showComponent === "favorite-dogs") {
      return favorited;
    }

    if (showComponent === "unfavorite-dogs") {
      return unfavorited;
    }
    return dogs;
  })();

  const onClickFavorited = () => {
    if (showComponent === "favorite-dogs") {
      setShowComponent("all-dogs");
    } else {
      setShowComponent("favorite-dogs");
    }
  };

  const onClickUnfavorited = () => {
    if (showComponent === "unfavorite-dogs") {
      setShowComponent("all-dogs");
    } else {
      setShowComponent("unfavorite-dogs");
    }
  };

  const onClickCreateDog = () => {
    if (showComponent === "create-dog-form") {
      setShowComponent("all-dogs");
    } else {
      setShowComponent("create-dog-form");
    }
  };

  useEffect(() => {
    refetchDogs();
  }, [refetchDogs]);

  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      <Section
        label={"Dogs: "}
        onClickFavorited={onClickFavorited}
        onClickUnfavorited={onClickUnfavorited}
        onClickCreateDog={onClickCreateDog}
        showComponent={showComponent}
        favoriteDogCount={favorited.length}
        unfavoriteDogCount={unfavorited.length}
      >
        {["all-dogs", "favorite-dogs", "unfavorite-dogs"].includes(
          showComponent
        ) && (
          <Dogs
            label={"All Dogs"}
            dogs={filteredDogs}
            unfavoriteDog={unfavoriteDog}
            deleteDog={deleteDog}
            favoriteDog={favoriteDog}
          />
        )}
        {showComponent === "create-dog-form" && (
          <CreateDogForm addDog={addDog} />
        )}
      </Section>
    </div>
  );
}

export default App;
