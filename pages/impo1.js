import { useState } from "react";
import { useAddSuperheroData } from "./hooks/useAddSuperheroData";

export default function AddSuperHeroForm() {
  const [name, setName] = useState("");
  const [power, setPower] = useState("");

  const { mutate } = useAddSuperheroData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHero = { name, power };
    mutate(newHero);
    setName("");
    setPower("");
    console.log(newHero)
  };

 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Superhero Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={power}
          placeholder="Superhero Power"
          onChange={(e) => setPower(e.target.value)}
        />
        <button type="submit" > submit</button>
      </form>
      
    </div>
  );
}
