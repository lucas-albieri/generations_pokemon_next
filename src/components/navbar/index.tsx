import { Container, Nav, Navbar, NavButton, NavItem, NavLink } from "./styles";
import { useEffect, useState } from "react";
import { Theme } from "../../styles/theme";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Typography } from "@mui/material";

const NavBar = () => {

    const [isScrolled, setIsScrolled] = useState(true);

    const router = useRouter()

    const navItems = [
        {
            title: "Twitter",
            link: "https://twitter.com/PokeUNITEBrasil",
            icon: "/img/brands/twitter.svg",
        },
        {
            title: "Instagram",
            link: "https://www.instagram.com/pokeunitebrasil/",
            icon: "/img/brands/instagram.svg",
        },
        {
            title: "Facebook",
            link: "https://www.facebook.com/PokeUNITEBrasil/",
            icon: "/img/brands/facebook.svg",
        },

    ]

    const onScroll = () => {
        if (window.scrollY >= 66) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    }

    useEffect(() => {
        onScroll()
        window.addEventListener("scroll", onScroll)
    }, [])

    return (
        <Navbar
            isScrolled={isScrolled}
        >
            <Container>
                <Typography
                    style={{
                        textDecoration: "none",
                        color: isScrolled ? `${Theme.theme.colors.gray700}` : `${Theme.theme.colors.white}`,
                        width: "50%",
                        fontWeight: "500",
                        fontSize: "0.9rem",
                        fontFamily: "Montserrat"
                    }}
                >
                    POKEMON GENERATIONS
                </Typography>

                <Nav>
                    {
                        navItems.map((item, index) => {
                            return (
                                <NavItem key={item.title}>
                                    <NavLink
                                        data-placement="bottom"
                                        onClick={() => router.push(item.link)}
                                        title={item.title}
                                    >
                                        <Image
                                            width={16}
                                            height={16}
                                            style={{
                                                width: "1rem",
                                                filter: isScrolled ? "invert(40%)" : "invert(88%)",
                                            }}
                                            src={item.icon}
                                            alt={item.title}
                                        />
                                    </NavLink>
                                </NavItem>
                            )
                        })
                    }
                    <NavItem>
                        <NavLink
                            style={{
                                color: isScrolled ? `${Theme.theme.colors.gray700}` : `${Theme.theme.colors.white}`,
                            }}
                            onClick={() => router.push("https://github.com/lucas-albieri/PokedexGenerations")}
                        >
                            <Image
                                width={14}
                                height={14}
                                style={{
                                    filter: isScrolled ? "invert(40%)" : "invert(88%)",
                                }}
                                src={'/img/brands/github.svg'}
                                alt="Book"
                            />
                            <Typography
                                style={{
                                    marginLeft: "0.5rem",
                                    fontSize: "0.9rem",
                                    fontFamily: "Montserrat",
                                }}
                            >
                                Documentação
                            </Typography>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavButton
                            onClick={() => router.push("/pokemondodia")}
                        >
                            <Image
                                width={25}
                                height={18}
                                objectFit="contain"
                                style={{
                                    width: "1.2rem",
                                    marginRight: "0.5rem",
                                }}
                                alt="Snorlax"
                                src={'/img/snorlax.png'} />
                            Pokemon do Dia
                        </NavButton>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;