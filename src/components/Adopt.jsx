import React from "react";

const Adopt = () => {
  const cows = [
    { name: "Bessie", breed: "Holstein", age: 4 },
    { name: "Daisy", breed: "Jersey", age: 3 },
    { name: "Buttercup", breed: "Guernsey", age: 5 },
  ];
  return (
    <div>
      <h2>Adopt a Cow</h2>
      <p>Support our farm and give a cow a loving home!</p>
      <div className="cow-list">
        {cows.map((cow, index) => (
          <div key={index} className="cow-card">
            <h3>{cow.name}</h3>
            <p>Breed: {cow.breed}</p>
            <p>Age: {cow.age} years</p>
            <button className="adopt-button">Adopt {cow.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adopt;
