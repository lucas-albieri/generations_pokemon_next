/* eslint-disable @next/next/no-page-custom-font */

import { useQuery } from "@apollo/client";
import { FormControl } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import NavBar from "../components/navbar";
import { TypeEnum } from "../models/enums/type_enum";
import { DifficultyEnum } from "../models/enums/difficulty_enum";
import { PokemonModel } from "../models/pokemon";
import { PokemonTypesModel } from "../models/pokemon_type_model";
import { GetAllPokemons } from "../queries/default_query";
import { BoxPokemonSelectedImage, Container, Content, Input, NumberOfTries, PokemonOfDayBlock, PokemonOfDayTitle, PokemonSelectedImage, PokemonSelectedName, PokemonSelectedPt1, PokemonSelectedPt2, PokemonsSelected, PokemonTip, PokemonTipImage, PokemonTipName, SelectMode, SelectModeButtonProps, SelectModeButtons, SelectModeTitle } from "../styles/pokemon-do-dia/style";


const PokemonOfDay = () => {

    const [difficulty, setDifficulty] = useState<DifficultyEnum>(DifficultyEnum.easy);
    const [namePokemon, setNamePokemon] = useState<string>("");

    const allPokemons = useQuery(GetAllPokemons,
        {
            variables: {
                limit: 900,
                offset: 0,
                _name: '%%',

            }
        });

    const _pokemon = allPokemons?.data?.pokemon_v2_pokemon.find((pokemon: { name: string; }) => pokemon.name.includes(namePokemon ?? '')) as any | undefined;

    const pokemonTipSprite = _pokemon && JSON.parse(_pokemon!.pokemon_v2_pokemonsprites[0].sprites)

    const pokemonOfDay = allPokemons?.data?.pokemon_v2_pokemon[1] as PokemonModel | undefined;
    const PokemonOfDaySprite = pokemonOfDay && JSON.parse(pokemonOfDay!.pokemon_v2_pokemonsprites[0].sprites)
    const pokemonOfDayTypes = pokemonOfDay && pokemonOfDay.pokemon_v2_pokemontypes.map(
        (pokemon: PokemonTypesModel) => pokemon.type_id) as number[] | undefined;

    const [pokemonsSelected, setPokemonsSelected] = useState<PokemonModel[]>([]);
    const pokemonsSelectedSprite = pokemonsSelected && pokemonsSelected.map(
        (pokemon: PokemonModel) => JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites))
    const pokemonsSelectedTypes = pokemonsSelected && pokemonsSelected.map(
        (pokemon: PokemonModel) => pokemon.pokemon_v2_pokemontypes)


    return (
        <Container>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <NavBar />
            <Content>
                <SelectMode>

                    <SelectModeTitle>
                        Selecione o Modo
                    </SelectModeTitle>

                    <SelectModeButtons>

                        <SelectModeButtonProps
                            isActive={difficulty === DifficultyEnum.easy}
                            onclick={() => setDifficulty(DifficultyEnum.easy)}
                            borderTopRightRadius="0"
                            borderBottomRightRadius="0"
                        >
                            Fácil
                        </SelectModeButtonProps>

                        <SelectModeButtonProps
                            isActive={difficulty === DifficultyEnum.hard}
                            onclick={() => setDifficulty(DifficultyEnum.hard)}
                            borderTopLeftRadius="0"
                            borderBottomLeftRadius="0"
                        >
                            Difícil
                        </SelectModeButtonProps>
                    </SelectModeButtons>
                </SelectMode>

                <PokemonOfDayBlock>
                    <PokemonOfDayTitle>
                        Qual é o Pokemon do dia?
                    </PokemonOfDayTitle>

                    <FormControl
                        fullWidth
                        sx={{
                            alignItems: "center",
                        }}
                    >
                        <Input
                            placeholder="Digite o nome do Pokemon"
                            onChange={(e) => setNamePokemon(e.target.value.toLocaleLowerCase())}
                            value={namePokemon}
                        />
                        {_pokemon && namePokemon &&
                            <PokemonTip
                                onClick={() => {
                                    setPokemonsSelected([...pokemonsSelected, _pokemon])
                                    setNamePokemon('')
                                }}

                            >
                                <PokemonTipImage
                                    src={pokemonTipSprite ? pokemonTipSprite.other['official-artwork'].front_default
                                        : ''}
                                />
                                <PokemonTipName>
                                    {allPokemons?.data.pokemon_v2_pokemon.find((pokemon: { name: string; }) => pokemon.name.includes(namePokemon))?.name}
                                </PokemonTipName>
                            </PokemonTip>
                        }
                        <NumberOfTries>
                            Numeros de Tentativas: {pokemonsSelected.length}
                        </NumberOfTries>
                    </FormControl>
                    {
                        pokemonsSelected.map((pok, index) => {
                            return (
                                <PokemonsSelected
                                    key={index}
                                >
                                    <PokemonSelectedPt1>
                                        <BoxPokemonSelectedImage>
                                            <PokemonSelectedImage
                                                src={pokemonsSelectedSprite ? pokemonsSelectedSprite[index].other['official-artwork'].front_default : ''}
                                            />
                                        </BoxPokemonSelectedImage>
                                        <PokemonSelectedName>
                                            {pok.name}
                                        </PokemonSelectedName>
                                    </PokemonSelectedPt1>
                                    {
                                        pokemonsSelectedTypes[index].map(type => {

                                            return (
                                                <PokemonSelectedPt2
                                                    key={type.type_id}
                                                    style={{
                                                        backgroundColor: type.type_id === (pokemonOfDayTypes!.find((typeId: number) => typeId === type.type_id)) ? "#00D0C2" : "#F40A5A",
                                                    }}
                                                >
                                                    <Image
                                                        width={20}
                                                        height={20}
                                                        src={`/img/types/${type.pokemon_v2_type.name}.png`}
                                                        alt={''}
                                                    />
                                                    <span
                                                        style={{
                                                            fontSize: "0.7rem",
                                                            fontWeight: "500",
                                                            color: "#fff",
                                                            textTransform: "capitalize",
                                                            marginTop: "0.3rem",
                                                        }}
                                                    >
                                                        {
                                                            TypeEnum.inPortuguese(type.pokemon_v2_type.name)
                                                        }
                                                    </span>
                                                </PokemonSelectedPt2>
                                            )
                                        })
                                    }

                                </PokemonsSelected>
                            )
                        })
                    }

                    {/* <img src={pokemonsSelectedSprite ? pokemonsSelectedSprite.other['official-artwork'].front_default : ''} /> */}

                </PokemonOfDayBlock>
            </Content>

        </Container>
    )
}

export default PokemonOfDay;