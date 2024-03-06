'use client';

import { useState } from "react";
import classnames from "classnames"; 

export interface Pokemon {   
  id: number,
  name: string,
  types: string[],
  sprite: string
}

type PokemonTypeSelectionProps = {
  selectedType : string | undefined;
  selectType: (type: string | undefined ) => void;
}

export default function PokemonRow({ pokemon } : { pokemon: Pokemon}) {
  const pokemonTypes = pokemon.types.map((pokemonType, idx) => <span key={idx} className="capitalize">{pokemonType} </span>);

  return (
    <div key={pokemon.id} className="mt-10 bg-white p-5 rounded text-black">
      <div><span className="font-bold">Name:</span> {pokemon.name}</div>
      <div><span className="font-bold">ID: </span>{pokemon.id}</div>
      <div><span className="font-bold">Types:</span> {pokemonTypes}</div>
      <img className="pt-5" src={pokemon.sprite} alt="image of a pokemon" width={220} height={229}/> 
    </div>
  );
}

export function PokedexTable({ pokemonArray } : { pokemonArray: Pokemon[] | undefined }) {
  const pokemonCards = pokemonArray?.map(pokemonData => 
    <PokemonRow key={pokemonData.id} pokemon={pokemonData}/>
  );

  return pokemonCards;
}

export function PokemonTypeSelection({ selectedType, selectType } : PokemonTypeSelectionProps ) {
  return (
    <div>
      <span>
        { selectedType ? (
          <span>The type is: {selectedType}</span>
        ):(
          <span>Please select a type</span>
        )}
      </span>
      <br/>
      <input onChange={ e => selectType(e.target.value) } />
    </div>
  );
}

export function FilterablePokedexTable({ pokemonArray } : { pokemonArray: Pokemon[] }) {
  const [pokemonType, setPokemonType] = useState<string|undefined>("water");

  const results = pokemonType ? pokemonArray.filter(pokemon => pokemon.types.includes(pokemonType)) : [];

  return (
    <>
      <PokemonTypeSelection selectedType={pokemonType} selectType={setPokemonType} />
      <PokedexTable pokemonArray={results} />   
    </>
  )
}