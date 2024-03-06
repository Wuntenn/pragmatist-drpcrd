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
  const pokemonTypes = pokemon.types.map((pokemonType, idx) => <span key={idx} className={classnames('capitalize')}>{pokemonType} </span>);

  return (
    <div key={pokemon.id} className={classnames("bg-slate")}>
      <div>Name: {pokemon.name}</div>
      <div>ID: {pokemon.id}</div>
      <div>Types: {pokemonTypes}</div>
      <img src={pokemon.sprite} alt="image of a pokemon" width={220} height={229}/> 
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