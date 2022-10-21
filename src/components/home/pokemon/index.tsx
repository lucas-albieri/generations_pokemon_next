import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { TypeEnum } from "../../../models/enums/type_enum";
import { PokemonModel } from "../../../models/pokemon";
import { BoxImage, BoxType, CasePokemon } from "./style";

const Pokemon = ({ id, name, pokemon_v2_pokemonsprites, pokemon_v2_pokemontypes }: PokemonModel) => {

    const sprites = pokemon_v2_pokemonsprites[0].sprites.replace(/[\\]/g, '');
    const newSprites = JSON.parse(sprites)

    return (
        <CasePokemon>
            <BoxImage>
                <Image
                    width={160}
                    height={160}
                    objectFit="cover"
                    src={newSprites.other['official-artwork'].front_default}
                    alt={name}
                />
            </BoxImage>
            <Typography
                color={"black"}
                style={{
                    marginTop: "0.3rem",
                    fontFamily: "Montserrat",
                }}
            >
                Nº {id}
            </Typography>
            <Typography
                style={{
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    marginTop: "0.3rem",
                    textTransform: "capitalize",
                    fontFamily: "Montserrat",
                }}
            >
                {name}
            </Typography>
            <BoxType
                style={{
                    justifyContent: pokemon_v2_pokemontypes.length > 1 ? "flex-start" : "flex-start",
                }}
            >
                {
                    pokemon_v2_pokemontypes.map((type: any) => {
                        return (
                            <Typography
                                key={type.id}
                                style={{
                                    fontSize: "0.85rem",
                                    padding: "0.2rem 1.2rem",
                                    borderRadius: "0.3rem",
                                    marginRight: pokemon_v2_pokemontypes.length > 1 ? "8px" : "0",
                                    color: 'white',
                                    backgroundColor: TypeEnum.toColor(type.pokemon_v2_type.name),
                                    fontFamily: "Montserrat",
                                }}>
                                {type.pokemon_v2_type.name}
                            </Typography>
                        )
                    })
                }
            </BoxType>
        </CasePokemon>
    )
}

export default Pokemon;